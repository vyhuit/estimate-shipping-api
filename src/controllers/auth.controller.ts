import { Controller, Post, Get, UseGuards } from "@nestjs/common";
import { ThrottlerBehindProxyGuard } from "src/security/guard/throttler-behind-proxy.guard";
import { AuthService } from "src/services/auth.service";

@UseGuards(ThrottlerBehindProxyGuard)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
}