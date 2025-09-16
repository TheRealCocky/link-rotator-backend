import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDTO } from './dtos/links';

@Injectable()
export class LinksModuleService {
  constructor(private prisma: PrismaService) {}
  async createLink(data: CreateLinkDTO): Promise<any> {
    const existing = await this.prisma.link.findUnique({
      where: { originalUrl: data.originalUrl },
    });
    if (existing) {
      throw new NotFoundException('Link already exists');
    }

    return this.prisma.link.create({
      data: {
        originalUrl: data.originalUrl,
        alternativeUrls: data.alternativeUrls,
        weights: data.weights || [],
        accessCount: 0,
      },
    });
  }
  async rotateLink(originalUrl: string): Promise<string> {
    const link = await this.prisma.link.findUnique({ where: { originalUrl } });
    if (!link) {
      throw new NotFoundException('Link not found');
    }
    let index: number;
    if (link.weights.length > 0 && link.weights.some((w) => w > 0)) {
      const totalWeight = link.weights.reduce((sum, w) => sum + w, 0);
      let random = Math.random() * totalWeight;
      index = 0;
      for (let i = 0; i < link.weights.length; i++) {
        random -= link.weights[i];
        if (random <= 0) {
          index = i;
          break;
        }
      }
    } else {
      index = link.accessCount % link.alternativeUrls.length;
    }
    const rotatedUrl = link.alternativeUrls[index];

    await this.prisma.link.update({
      where: { originalUrl },
      data: { accessCount: { increment: 1 } },
    });
    return rotatedUrl;
  }
  async getAllLinks(): Promise<any[]> {
    return this.prisma.link.findMany();
  }
}
