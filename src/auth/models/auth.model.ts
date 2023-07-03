import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '../dto/user.dto';
import { Token } from './token.model';

export class Auth extends Token {
  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}
