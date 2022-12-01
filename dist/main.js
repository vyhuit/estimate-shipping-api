"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const express = require("express");
const cors = require("cors");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const binaryMimeTypes = [];
let cachedServer;
process.on('unhandledRejection', (reason) => {
    console.error(reason);
});
process.on('uncaughtException', (reason) => {
    console.error(reason);
});
async function bootstrapServer() {
    if (!cachedServer) {
        try {
            const expressApp = express();
            const nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
            nestApp.use((0, middleware_1.eventContext)());
            await nestApp.init();
            expressApp.use(cors());
            expressApp.use(nestApp.getHttpAdapter().getInstance());
            cachedServer = (0, aws_serverless_express_1.createServer)(expressApp);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve(cachedServer);
}
const handler = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=main.js.map