import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PrismaService } from 'nestjs-prisma';

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

  create(createPhotoDto: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: createPhotoDto,
    });
  }

  findAll() {
    return this.prisma.photo.findMany();
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
