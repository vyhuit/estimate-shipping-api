import { Injectable } from "@nestjs/common";
import { ObjectId } from 'bson';

@Injectable()
export class AuthService {
  signup() {
    const id = new ObjectId(); // ObjectId generation for mongoDB
    return {msg: `You have just signed UP! ${id}`};
  }

  signin() {
    return {msg: "You have just signed IN!"};
  }
}
