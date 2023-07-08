import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async deleteBatch(ids: string[]) {
    const res = await this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return {
      count: res.count,
    };
  }

  async findAll() {
    const res = await this.prisma.category.findMany({
      include: {
        Post: true,
      },
    });
    return res.map((item) => {
      return {
        ...item,
        postCount: item.Post.length,
      };
    });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
