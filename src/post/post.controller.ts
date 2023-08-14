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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDTO } from './dto/post.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiResponse({ type: PostDTO })
  @UseGuards(JwtGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiResponse({ type: PostDTO, isArray: true })
  findAll() {
    return this.postService.findAll() as unknown as PostDTO[];
  }
  @Get('/recent')
  @ApiResponse({ type: PostDTO, isArray: true })
  findRecent() {
    return this.postService.findRecent() as unknown as PostDTO[];
  }

  @Get(':id')
  @ApiResponse({ type: PostDTO })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id) as unknown as PostDTO;
  }

  @Patch(':id')
  @ApiResponse({ type: PostDTO })
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({ type: PostDTO })
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
