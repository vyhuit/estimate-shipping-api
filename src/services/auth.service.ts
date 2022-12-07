import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {mowLogsConsole} from 'src/common/helpers/public';
import {User} from 'src/schemas/user.schema';
import {jwtConstants} from '../common/constants/jwtConstants';
import {UsersService} from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService : UsersService, private jwtService : JwtService) {};
  async validateUser(username : string, password : string): Promise < any > {
    const userResult = await this.usersService.getUserByUsername(username);
    if (userResult && userResult.password === password) {
      const {
        password,
        ...result
      } = userResult;
      return result;
    }
    return null;
  };

  async login(user : any) {
    const payload = {
      username: user.username,
      sub: user._id
    };
    let configService = new ConfigService();
    const jwtOptions = {
      secret: configService.get("JWT_SECRET")
    }
    return {
      access_token: this.jwtService.sign(payload, jwtOptions)
    };
  };
}
