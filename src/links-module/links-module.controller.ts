import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinksModuleService } from './links-module.service';
import { CreateLinkDTO } from './dtos/links';
import type { Response } from 'express';

@Controller('links-module')
export class LinksModuleController {
  constructor(private linkesService: LinksModuleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateLinkDTO): Promise<any> {
    return this.linkesService.createLink(body);
  }

  @Get(':originalUrl/rotate')
  async rotate(@Param('originalUrl') originalUrl: string, @Res() res: Response) {
    const url = await this.linkesService.rotateLink(originalUrl);
    return res.redirect(url); // 👈 redireciona o user
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.linkesService.getAllLinks();
  }

  @Get(':originalUrl/metrics')
  async metrics(@Param('originalUrl') originalUrl: string) {
    return this.linkesService.getMetrics(originalUrl);
  }
}
