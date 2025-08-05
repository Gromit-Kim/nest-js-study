import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({
    message: 'title은 string 타입을 입력해주어야 합니다.',
  })
  title: string;

  @IsString()
  content: string;
}
