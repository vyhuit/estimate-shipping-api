import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {mowLogsConsole} from 'src/common/helpers/public';
import {UserModel} from 'src/common/models/user';
import {User, UserDocument} from 'src/schemas/user.schema';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)private readonly userModel : Model < UserDocument >) {};
  async create(user : UserModel): Promise < User | undefined | any > {
    try {
      const userRegister = await this.userModel.create(user);
      return {isSuccess: true, data: userRegister.save(), message: "Success"};
    } catch (error) {
      return {isSuccess: false, data: error, message: (`${error.name}: ${error.message}`)};
    }
  };
  async getUserByUsername(username : string): Promise < User | undefined > {
    let userResult = await this.userModel.findOne(
      {username: username}
    ).lean(true);
    mowLogsConsole("GET", userResult);
    return !userResult
      ? undefined
      : userResult;
  };
} 