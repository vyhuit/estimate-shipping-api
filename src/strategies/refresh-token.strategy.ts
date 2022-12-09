import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {mowLogsConsole} from 'src/common/helpers/public';
import {UsersService} from 'src/services/users.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
  constructor(private readonly configService : ConfigService, private readonly userService : UsersService) {
    super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: configService.get<string>("JWT_REFRESH_SECRET")});
  };
  async validate(req : Request, payload : any) {
    let user = await this.userService.getUserById(req['userId']);
    return user;
  };
} 