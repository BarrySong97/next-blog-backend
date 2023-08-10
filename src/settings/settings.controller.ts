import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Layout, SettingDto } from './dto/setting.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('settings')
@ApiTags('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto) as any as SettingDto;
  }

  @Post('/photo')
  @ApiBody({ type: Layout, isArray: true })
  @UseGuards(JwtGuard)
  addPhotoLayout(@Body() layout: Layout[]) {
    return this.settingsService.addPhotoLayout(
      JSON.stringify(layout)
    ) as any as SettingDto;
  }

  @Get()
  find() {
    return this.settingsService.findAll() as any as SettingDto;
  }
  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(
      id,
      updateSettingDto
    ) as any as SettingDto;
  }
}
