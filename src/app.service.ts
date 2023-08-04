import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getDashboardData() {
    const post = await this.prisma.post.count();
    const photo = await this.prisma.photo.count();
    const project = await this.prisma.project.count();
    return {
      post: post,
      photo: photo,
      project: project,
    };
  }
}
