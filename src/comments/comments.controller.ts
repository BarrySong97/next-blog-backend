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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { UserDTO } from 'src/auth/dto/user.dto';
import { CommentDTO } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserDTO
  ) {
    return this.commentsService.create(
      createCommentDto,
      user
    ) as any as CommentDTO;
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string, @CurrentUser() user: UserDTO) {
    return this.commentsService.remove(id, user.id);
  }
}
