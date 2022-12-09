import {Handler, Context} from 'aws-lambda';
import {Server} from 'http';
import {createServer, proxy} from 'aws-serverless-express';
import {eventContext} from 'aws-serverless-express/middleware';
import * as express from 'express';
import * as cors from 'cors';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules/app.module';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
  if (! cachedServer) {
    try {
      const expressApp = express();
      const nestApp = await NestFactory.create(AppModule);
      nestApp.use(eventContext());
      await nestApp.init();
      expressApp.use(cors());
      expressApp.use(nestApp.getHttpAdapter().getInstance());
      cachedServer = createServer(expressApp);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(cachedServer);
}

export const handler: Handler = async (event : any, context : Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
