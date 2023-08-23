export class CreateCommentDto {
  content: string;
  postId: string;
  parentId?: string;
  replyToId?: string;
}
