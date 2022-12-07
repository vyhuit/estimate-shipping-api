import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { stringify } from 'querystring';
import { mowLogsConsole } from 'src/common/helpers/public';
import {UserModel} from 'src/common/models/user';
import {JwtAuthGuard} from 'src/security/guard/jwt-auth.guard';
import {AuthService} from 'src/services/auth.service';
import {UsersService} from 'src/services/users.service';
import {LocalAuthGuard} from '../security/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService : AuthService, private readonly userService : UsersService) {};

  @Post('auth/register')
  async register(@Request()req : any) {
    return this.userService.create(req.body);
  };

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request()req : any) {
    return this.authService.login(req.user);
  };

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request()req : any) {
    return req.user;
  }
}
