import {ForbiddenException, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {jwtConstants} from 'src/common/constants/jwtConstants';
import {mowLogsConsole} from 'src/common/helpers/public';
import {HashingModel} from 'src/models/hashing';
import {UserModel} from 'src/models/user';
import {UsersService} from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService : UsersService, private jwtService : JwtService, private readonly configService : ConfigService) {};
  async validateUser(username : string, password : string): Promise < any > {
    let hashing = new HashingModel();
    const userResult = await this.usersService.getUserByUsername(username);
    if (userResult && hashing.compare(userResult.password, password)) {
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
      userId: user._id,
      ...user
    };
    const {accessToken, refreshToken} = this.getTokens(payload);
    const hashing = new HashingModel();
    this.usersService.updateUserById(user._id, {refreshToken: hashing.hash(refreshToken)});
    return {accessToken: accessToken, refreshToken: refreshToken, expiresIn: jwtConstants.JWT_EXPIRED};
  };
  async refreshTokens(user : any) {

// const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const hashing = new HashingModel();

// const refreshTokenMatches = user.refresh_token === refreshToken;

// if (! refreshTokenMatches) {
// throw new ForbiddenException('Access Denied');
// }
    const tokens = this.getTokens({userId: user._id, username: user.username});
    await this.usersService.updateUserById(user._id, {
      refreshToken: hashing.hash(tokens.refreshToken)
    });
    return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, expiresIn: jwtConstants.JWT_EXPIRED};
  };
  getTokens(data : {
    userId: string,
    username: string
  }) {
    const accessTokenOptions = {
      secret: jwtConstants.JWT_SECRET,
      expiresIn: jwtConstants.JWT_EXPIRED
    }
    const refreshTokenOptions = {
      secret: jwtConstants.JWT_REFRESH_SECRET,
      expiresIn: jwtConstants.JWT_REFRESH_EXPIRED
    }

    const accessToken = this.jwtService.sign(data, accessTokenOptions);
    const refreshToken = this.jwtService.sign(data, refreshTokenOptions);
    return {accessToken, refreshToken};
  };
}
