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
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoDTO } from './dto/photo.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { TagDTO } from './dto/tas.dto';

@Controller('photos')
@ApiTags('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @ApiResponse({ type: PhotoDTO })
  @UseGuards(JwtGuard)
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get('/recent')
  @ApiResponse({ type: PhotoDTO, isArray: true })
  findRecent() {
    return this.photosService.findRecent() as unknown as PhotoDTO[];
  }

  @Get('/tags')
  @ApiResponse({ type: TagDTO, isArray: true })
  getAllTags() {
    return this.photosService.getAllTags() as unknown as TagDTO[];
  }

  @Get()
  @ApiResponse({ type: PhotoDTO, isArray: true })
  findAll() {
    return this.photosService.findAll();
  }

  @Delete('/batch')
  @UseGuards(JwtGuard)
  async deleteBatch(@Body() ids: string[]) {
    return this.photosService.deleteBatch(ids) as any as { count: number };
  }

  @Get(':id')
  @ApiResponse({ type: PhotoDTO })
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: PhotoDTO })
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  @ApiResponse({ type: PhotoDTO })
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
