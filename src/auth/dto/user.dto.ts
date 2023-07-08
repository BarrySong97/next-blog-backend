import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDTO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  @ApiProperty({ enum: Role })
  role: Role;
}
