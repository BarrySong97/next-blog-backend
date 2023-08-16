import * as readingTime from 'reading-time';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    const stats = (readingTime as any)(createPostDto.content);
    return this.prisma.post.create({
      data: { ...createPostDto, readingTime: stats.minutes.toFixed(0) },
      include: {
        category: true,
      },
    });
  }

  findAll(search?: string) {
    return this.prisma.post.findMany({
      include: {
        category: true,
      },
      where: {
        content: {
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  findRecent() {
    return this.prisma.post.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 3,
    });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const stats = (readingTime as any)(updatePostDto.content);
    delete updatePostDto.updatedAt;
    return this.prisma.post.update({
      where: { id },
      data: { ...updatePostDto, readingTime: stats.minutes.toFixed(0) },
      include: {
        category: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
