import { Module } from '@nestjs/common';
import { LinksModuleService } from './links-module.service';
import { LinksModuleController } from './links-module.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModuleModule } from '../auth-module/auth-module.module';

@Module({
  imports: [PrismaModule, AuthModuleModule],
  providers: [LinksModuleService],
  controllers: [LinksModuleController],
})
export class LinksModuleModule {}
