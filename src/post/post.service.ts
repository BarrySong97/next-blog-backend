import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto,
      include: {
        category: true,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: 'desc',
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
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
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
