import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  UnauthorizedException,
  Response
} from "@nestjs/common";
import {ThrottlerBehindProxyGuard} from "src/common/guard/throttler-behind-proxy.guard";
import {AuthService} from "src/services/auth.service";
import {AccessTokenAuthGuard} from 'src/common/guard/access-token.guard';
import {UsersService} from 'src/services/users.service';
import {LocalAuthGuard} from '../common/guard/local-auth.guard';
import {RefreshTokenGuard} from "src/common/guard/refresh-token.guard";
import { mowLogsConsole } from "src/common/helpers/public";

@UseGuards(ThrottlerBehindProxyGuard)
@Controller("auth")
export class AuthController {
  constructor(private authService : AuthService, private readonly userService : UsersService) {};

  @Post('register')
  async register(@Request()req : any) {
    return this.userService.create(req.body);
  };

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request()req : any, @Response() res:any) {
    // mowLogsConsole("COOKIE SETTING");
    const loggedin = await this.authService.login(req.user);
    // mowLogsConsole("COOKIE SETED",loggedin);
    res.cookie("access-token", loggedin.accessToken).json(loggedin)
    // return loggedin;
  };

  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  getProfile(@Request()req : any) {
    return req.user;
  };

  @UseGuards(RefreshTokenGuard)
  @Get("/refresh")
  refreshTokens(@Request()req : any) {
    if (req.user) {
      return this.authService.refreshTokens(req.user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
