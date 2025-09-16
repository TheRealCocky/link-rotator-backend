import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { CreateUserDTO } from './dtos/User';
import { AuthGuard } from './auth.guard'; // o guard que criamos antes

@Controller('auth')
export class AuthModuleController {
  constructor(private authService: AuthModuleService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDTO) {
    return await this.authService.register(body);
  }

  @Post('signin')
  async signIn(@Body() body: CreateUserDTO) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req) {
    return req.user;
  }
}

