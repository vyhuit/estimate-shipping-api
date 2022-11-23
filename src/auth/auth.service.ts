import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  
  signup(){
    return {
      msg: "You have just signed UP!"
    };
  }

  signin(){
    return {
      msg: "You have just signed IN!"
    };
  }
}
