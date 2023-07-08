import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSettingDto: CreateSettingDto) {
    return this.prisma.setting.create({
      data: createSettingDto,
    });
  }

  findAll() {
    return this.prisma.setting.findFirst();
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.prisma.setting.update({
      where: { id },
      data: updateSettingDto,
    });
  }
}
