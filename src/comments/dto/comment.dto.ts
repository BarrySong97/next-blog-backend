import { UserDTO } from 'src/auth/dto/user.dto';
import { BaseModel } from 'src/common/models/base.model';

export class CommentDTO extends BaseModel {
  id: string;
  content: string;
  postId: string;
  parentId?: string;
  replyToId?: string;
  children?: CommentDTO[];
  replies?: CommentDTO[];
  author: UserDTO;
}
