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
import { Exclude, Expose } from 'class-transformer';

@Entity()
// @Exclude() // class 자체에 exclude를 처리할 수 있다. - 개별 프로퍼티에 expose를 처리한다.
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
  // @Expose()
  nickname: string;

  // @Expose() // Exclude의 반대로 보여주기 위함.
  // get nicknameAndEmail() {
  //   return this.nickname + '/' + this.email;
  // }

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
  /**
   * Request
   * front -> back
   * plan object (JSON) -> class instance (dto)
   *
   * Response
   * back -> front
   * class instance(dto) -> plan object(JSON)
   *
   * toClassOnly > class instance로 변환될때만 (요청일 때만)
   * toPlainOnly > plain object로 변환될때만 (응답으로 변환될 때만)
   *
   * exclude의 기본값은 요청과 응답 둘다임
   *
   * 그런데 우리는 요청에선 받아야함(회원가입 로그인 등)
   */
  @Exclude({ toPlainOnly: true })
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
