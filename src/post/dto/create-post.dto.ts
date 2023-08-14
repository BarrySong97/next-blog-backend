import { CategoryDTO } from 'src/category/dto/category-dto';

export class CreatePostDto {
  title: string;
  content: string;
  authorId: string;
  updatedAt: string;
  categoryId: string;
  cover?: string;
  html: string;
  toc: string;
}
