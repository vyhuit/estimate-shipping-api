import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {encryptText} from 'src/common/helpers/encryptAndHashing';
import { mowLogsConsole } from 'src/common/helpers/public';
import {EncryptionModel} from 'src/models/encryption';
import {HashingModel} from 'src/models/hashing';
import {UserModel} from 'src/models/user';
import {User, UserDocument} from 'src/schemas/user.schema';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)private readonly userModel : Model < UserDocument >) {};
  async create(user : UserModel): Promise < User | undefined | any > {
    let hashing = new HashingModel(10);
    let hashedPassword = await hashing.hash(user.password);
    let userClone = {
      ...user
    };
    userClone.password = hashedPassword;
    userClone.isActive = true;
    userClone.createdDay = new Date();
    try {
      const userRegister = await this.userModel.create(userClone);
      userRegister.save();
      return {isSuccess: true, data: user, message: "Success"};
    } catch (error) {
      return {
        isSuccess: false,
        data: error,
        message: (`${
          error.name
        }: ${
          error.message
        }`)
      };
    }
  };
  async getUserByUsername(username : string): Promise < User | undefined > {
    let userResult = await this.userModel.findOne(
      {username: username}
    ).lean(true);
    return ! userResult
      ? undefined
      : userResult;
  };
  async updateUserById(id : string, data : any): Promise < UserDocument > {
    return await this.userModel.findByIdAndUpdate(id, data, {new: true}).exec();
  }
  async getUserById(id : string) {
    return await this.userModel.findById(id);
  }
} 