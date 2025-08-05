import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import {
  IsEmail,
  IsString,
  Length,
  ValidationArguments,
} from 'class-validator';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { emailValidationMesage } from 'src/common/validation-message/email-validation.message';
import { Exclude } from 'class-transformer';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  }) // 제약 사항을 직접 넣어주지 않는 에노테이션은 어떤 값을 넣었는지 순서대로 받아볼 수 없다.
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidationMesage,
    },
  )
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  @Exclude()
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
