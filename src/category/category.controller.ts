import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDTO } from './dto/category-dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({ type: CategoryDTO })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(
      createCategoryDto
    ) as any as Promise<CategoryDTO>;
  }

  @Delete('batch')
  deleteBatch(@Body() ids: string[]) {
    return this.categoryService.deleteBatch(ids) as any as Promise<{
      count: number;
    }>;
  }

  @Get()
  @ApiResponse({ type: CategoryDTO, isArray: true })
  findAll() {
    return this.categoryService.findAll() as any as Promise<CategoryDTO[]>;
  }

  @Get(':id')
  @ApiResponse({ type: CategoryDTO })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id) as any as Promise<CategoryDTO>;
  }

  @Patch(':id')
  @ApiResponse({ type: CategoryDTO })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryDTO> {
    return this.categoryService.update(
      id,
      updateCategoryDto
    ) as any as Promise<CategoryDTO>;
  }

  @Delete(':id')
  @ApiResponse({ type: CategoryDTO })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id) as any as Promise<CategoryDTO>;
  }
}
