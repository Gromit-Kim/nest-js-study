import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

// base model을 entity 등록을 해서 사용하는 경우 (single base model)
/**
 * single base model 안의 모든 프로퍼티들을 자식 엔티티들이 그대로 상속받는 건 확실하다.
 * 이때, 자식 모델인 컴퓨터, 비행기의 차이점이 country와 brand가 있다.
 *
 * base model에 `@TableInheritance`라는 어노테이션을 두고 옵션을 넣어야 한다.
 * 우리는 하나의 테이블로 2개의 ENTITY를 관리하려 했다.
 *
 * 하나의 테이블에서 그 안에 들어가는 로우가 이 컴퓨터 모델에 해당 된느지 에어플레인에 해당되는 지 구분할 방법이 필요
 * 그 구분하는 컬럼을 뭘로 할지 name에 정해주면 된다.
 * type이라고 하면 type이라는 컬럼이 추가적으로 생긴다.
 * 이 type 컬럼은 varchar라는 string 타입으로 넣는다.
 */
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
@TableInheritance({})
export class AirplaneModel extends SingleBaseModel {
  @Column()
  country: string;
}
