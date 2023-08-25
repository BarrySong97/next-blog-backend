import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PrismaService } from 'nestjs-prisma';
import { PhotoTag } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  deleteBatch(ids: string[]) {
    return this.prisma.photo.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  getAllTags() {
    return this.prisma.photoTag.findMany();
  }
  findRecent() {
    return this.prisma.photo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 9,
    });
  }
  async create(createPhotoDto: CreatePhotoDto) {
    const { tags } = createPhotoDto;
    const [, photo] = await this.prisma.$transaction([
      this.prisma.photoTag.createMany({
        data: tags.map((name) => ({
          name,
        })),
        skipDuplicates: true, // 跳过重复
      }),
      this.prisma.photo.create({
        data: {
          ...createPhotoDto,
          PhotoTags: {
            connect: tags.map((tag) => ({
              name: tag,
            })),
          },
        },
        include: {
          PhotoTags: true,
        },
      }),
    ]);
    return photo;
  }

  findAll() {
    return this.prisma.photo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.photo.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePhotoDto: UpdatePhotoDto) {
    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
    });
  }

  remove(id: string) {
    return this.prisma.photo.delete({
      where: { id },
    });
  }
}
