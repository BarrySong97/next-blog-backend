import { ApiProperty } from '@nestjs/swagger';
import { CommonDTO } from 'src/common/commom.dto';

export class CategoryDTO extends CommonDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  postCount: number;
}
