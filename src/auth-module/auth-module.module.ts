import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModuleService } from './auth-module.service';
import { AuthModuleController } from './auth-module.controller';
import { PrismaModule } from 'nestjs-prisma';
import { JwtConstants } from './constants';
// @ts-ignore
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthModuleService, JwtStrategy],
  controllers: [AuthModuleController],
  exports: [AuthModuleService, PassportModule, JwtModule],
})
export class AuthModuleModule {}
