import { ApiProperty } from '@nestjs/swagger';
import { CategoryDTO } from 'src/category/dto/category-dto';
import { CommonDTO } from 'src/common/commom.dto';

export class PostDTO extends CommonDTO {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  @ApiProperty({ type: CategoryDTO })
  category: CategoryDTO;
}