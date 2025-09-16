import { Module } from '@nestjs/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { LinksModuleModule } from './links-module/links-module.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModuleModule, LinksModuleModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
