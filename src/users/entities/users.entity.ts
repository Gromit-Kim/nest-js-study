import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  @IsString()
  @Length(1, 20, { message: '닉네임은 1~20자 사이로입력해주세요. ' })
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(3, 8)
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  /**
   * many to one과 마찬가지이다.
   * 하나의 사용자가 여러 개의 포스틀 바라본다.
   * arg1: 연동할 상대방을 반환하는 함수를 표시한다.
   *      이미 리스트라는 걸 알기에 []를 따로 표시하지 않아도 된다.
   * arg2: 앞의 arg1이 리턴한 값을 받아서 연동할 상대방의 프로퍼티를 리턴하는 함수 작성
   *
   * List를 반환하므로 nullable option을 사용하지 않아도 된다.
   */
  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
