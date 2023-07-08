import { CommonDTO } from 'src/common/commom.dto';
import { PostDTO } from 'src/post/dto/post.dto';

export class ProjectDTO extends CommonDTO {
  name: string;
  url: string;
  image: string;
  content: string;
  post: PostDTO;
}
