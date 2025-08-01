import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  // JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // @PrimaryGeneratedColumn()
  // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
  // 테이블 안에서 각각의 Row를 구분할 수 있는 칼람이다.
  // @PrimaryColumn()
  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneatedColumn은 순서대로 값이 올라간다. 1, 2, 3, 4 ....
  // uuid의 경우는 adbasd12345cdfdf-asdfasdf1234dafdadsf-123asdfbcad 처럼 나온다.
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column({
  //     // 데이터베이스에서 인지하는 칼럼 타입
  //     // 자동으로 추론되어 넣지 않아도 된다.
  //     type: 'varchar',
  //     // 데이터베이스의 칼럼 이름
  //     // 작성하지 않으면 프로퍼티 이름으로 자동 처리됨.
  //     name: 'title',
  //     // 값의 길이
  //     // 입력할 수 있는 글자의 길이가 300
  //     length: 300,
  //     // null이 가능한지
  //     nullable: true,
  //     // true면 처음 저장할 때만 값 지정 가능
  //     // 이후에는 값 변경 불가능
  //     update: false,
  //     // default is true
  //     // find 관련 실행시 기본으로 값을 불러올지를 정한다.
  //     // 만약 false를 하면 기본으로 들어오지 않는다.
  //     select: false,
  //     //아무것도 입력 안했을 때 기본으로 입력되는 값(생성할 때 사용)
  //     default: 'default value',
  //     // 컬럼 중에서 유일무이한 값이 되어야 하는지
  //     // pk는 기본적으로 unique임.
  //     // 회원가입할 때 이메일에 많이 사용한다. (null 도 중복되면 안된다.)
  //     // default 는 false
  //     unique: false,
  //   })
  //   title: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트될 때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇 번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // generated annotation은 column annotation과 함께 사용해야 한다.
  @Column()
  @Generated('uuid') // pk는 아니지만 자동으로 1씩 올라가는 게 increment, uuid를 하면 string으로 타입 변경
  additionalId: string; // number or string

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행할 때마다 항상 같이 가져올 relation
    eager: true, // user모델할 때마다 자동으로 profile을 가져온다. (쿼리에서 하지 않아도 가져옴, 기본값은 false)
    // 저장할 때, relation을 한 번에 저장 가능 (default는 true)
    cascade: false,
    // nullabl: true
    nullable: true,
    // on: ~했을 때, => 관계가 삭제되었을 때
    // no action -> 아무것도 안함
    // cascase -> 참조하는 Row도 삭제
    // set null -> 참조하는 Row에서 참조 id를 null로 변경
    // set default -> 기본 세팅으로 설정(테이블의 기본 셋팅)
    // restrict -> 참조하고 있는 ROw가 있는 경우 참조하는 Row 삭제 불가.
    onDelete: 'CASCADE',
  })
  // @JoinColumn()
  profile: ProfileModel;

  // 1:n과 n:1은 JoinColumn을 할 필요가 없다.
  // 항상 many의 입장을 가지는 테이블이 상대의 id를 가진다.
  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
