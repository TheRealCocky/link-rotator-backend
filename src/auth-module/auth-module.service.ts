import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma'; // Ou '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/User';

@Injectable()
export class AuthModuleService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDTO): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    return { message: 'User registered successfully' };
  }
  async login(
    data: CreateUserDTO,
  ): Promise<{ accessToken: string; message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.password };
    return { accessToken: this.jwtService.sign(payload), message: 'Logged in' };
  }
}
