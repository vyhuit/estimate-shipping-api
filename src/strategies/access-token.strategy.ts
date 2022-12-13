import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from 'src/common/constants/jwtConstants';
import {mowLogsConsole} from 'src/common/helpers/public';
import {UsersService} from 'src/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService : ConfigService, private readonly userService : UsersService) {
    super({

// jwtFromRequest: ExtractJwt.fromExtractors(
// [(request : Request) => {
//       let data = request ?. cookies['access-token'];
//       mowLogsConsole("COOKIES", request);
//       if (! data) {
//         return null;
//       }
//       return data.token
//     }
// ]
// ),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JWT_SECRET,
      signOptions: {
        expiresIn: jwtConstants.JWT_EXPIRED
      }
    });
  }
  validate(payload : any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
} 