import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto, user: UserDTO) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId: user.id,
      },
    });
  }

  findAll() {
    return this.prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        parent: null,
      },
      include: {
        children: {
          include: {
            author: true,
          },
        },
        author: true,
        replyTo: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.author.id !== userId) {
      throw new Error('Unauthorized');
    }
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
