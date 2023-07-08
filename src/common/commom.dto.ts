import { ApiProperty } from '@nestjs/swagger';

export class CommonDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
