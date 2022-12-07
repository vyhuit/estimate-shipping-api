import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {jwtConstants} from '../common/constants/jwtConstants';
import {AuthService} from '../services/auth.service';
import {LocalStrategy} from '../strategies/local.strategy';
import {JwtStrategy} from '../strategies/jwt.strategy';
import {UsersModule} from './users.module';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register(
      {
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '6000s'
        }
      }
    ),
    UsersModule,
    PassportModule
  ],
  providers: [
    AuthService, LocalStrategy, JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}