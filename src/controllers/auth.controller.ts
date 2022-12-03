import { Controller, Post, Get } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup() {
    return this.authService.signup();
  }
  @Post("signin")
  signin() {
    return this.authService.signin();
  }
}