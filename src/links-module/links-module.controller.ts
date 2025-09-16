import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinksModuleService } from './links-module.service';
import { CreateLinkDTO } from './dtos/links';

@Controller('links-module')
export class LinksModuleController {
  constructor(private linkesService: LinksModuleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateLinkDTO): Promise<any> {
    return this.linkesService.createLink(body);
  }

  @Get(':originalUrl/rotate')
  async rotate(
    @Param('originalUrl') originalUrl: string,
  ): Promise<{ redirectUrl: string }> {
    const url = await this.linkesService.rotateLink(originalUrl);
    return { redirectUrl: url };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.linkesService.getAllLinks();
  }
}
