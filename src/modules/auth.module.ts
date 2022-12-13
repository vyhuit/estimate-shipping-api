import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {jwtConstants} from '../common/constants/jwtConstants';
import {AuthService} from '../services/auth.service';
import {LocalStrategy} from '../strategies/local.strategy';
import {JwtStrategy} from '../strategies/access-token.strategy';
import {UsersModule} from './users.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {RefreshTokenStrategy} from 'src/strategies/refresh-token.strategy';
import {AuthController} from 'src/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService : ConfigService) => {
          return {
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('JWT_EXPIRED')
            }
          };
        },
        inject: [ConfigService]
      }
    ),
    UsersModule,
    PassportModule,
    AuthModule
  ],
  providers: [
    JwtService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}