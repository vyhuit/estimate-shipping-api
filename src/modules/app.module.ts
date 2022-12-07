import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {MongooseModule} from '@nestjs/mongoose';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {AppController} from '../controllers/app.controller';
import {AuthModule} from './auth.module';
import {AuthService} from '../services/auth.service';
import throttleConfig from '../config/security/configuration';
import {ProductModule} from './product.module';
import {SupplierModule} from './supplier.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users.module';

@Module({
  imports: [
    ProductModule,
    SupplierModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(
      {
        envFilePath: ['.development.env'],
        isGlobal: true,
        load: [throttleConfig]
      },
    ),
    ThrottlerModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (config : ConfigService) => (
          {ttl: config.get('THROTTLE_TTL'), limit: config.get('THROTTLE_LIMIT')}
        )
      }
    ),
    MongooseModule.forRoot(process.env.ROOT_DATABASE_URL + process.env.ESTIMATE_DB_PRODUCT || "mongodb+srv://hoang:Voyenhoang1998@cluster0.cwg4pt0.mongodb.net/test")
  ],
  providers: [
    AuthService, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    JwtService
  ],
  controllers: [AppController]
})
export class AppModule {}
