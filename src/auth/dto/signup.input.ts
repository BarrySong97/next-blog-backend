import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class SignupInput {
  @IsEmail()
  email: string;

  avatar: string;

  googleId: string;

  firstname?: string;

  lastname?: string;

  role: Role;
}
