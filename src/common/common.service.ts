import { Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import { FindManyOptions, FindOptions, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { BaseModel } from './entity/base.entity';

@Injectable()
export class CommonService {
  pagiante<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
    path: string,
  ) {
    if (dto.page) {
      return this.pagePagiante(dto, repository, overrideFindOptions);
    }
    return this.cursorPaginate(dto, repository, overrideFindOptions, path);
  }

  private async pagePagiante<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
  ) {}

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
    path: string,
  ) {
    /**
     * id 기반으로만 수행하는 게 아니라 일반화를 통해서 아래와 같은 작업들도(예시로) 할 수 있어야 한다.
     *
     * where__likeCount__more_than : where query로 likeCount 프로퍼티를 more than을 사용해 필터링할 거야.
     *
     * where__title__ilike
     */
  }

  private composeFindOptions(
    dto: BasePaginationDto,
  ): FindManyOptions<T extends BaseModel> {
    /**
     * 반환할 값
     * where,
     * order,
     * take,
     * skip -> page 기반인 경우만
     */

    /**
     * DTO의 현재 생긴 구조는 아래와 같다.
     * 
     * {
     *  where__id__more_than: 1,
     *  order__createdAt: 'ASC',
     * }
     * 
     * 현재는 where__id__more_than / where__id__less_than에 해당되는 where 필터만 사용중이지만
     * 나중엔 where__likeCOunt__more_than이나  where__title__ilike 등 추가 필터를 넣고 싶어졌을 때
     * 
     * 1) where로 시작한다면 필터 로직을 적용한다.
     * 2) order로 시작한다면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__' 기준으로 split 했을 때 3개의 값으로 나뉘는지
     *    2개의 값으로 나뉘는지 확인한다.
     *    3-1) 3개의 값으로 나뉜다면 FILTER_MAPPER에서 해당되는 operator 함수를 찾아서 적용한다.
     *        ['where', 'id', 'more_than' ]
     *    3-2) 2개의 값으로 나뉜다면 정확한 값을 필터하는 것이기 때문에 operator 없이 적용한다.
     *        where__id
     *        ['where', 'id']
     * 4) order의 경우 3-2와 같이 적용한다.
     */

    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for(const [key, value] of Object.entries(dto)){
      // key -> where__id__less_than
      // value -> 1

      if(key.startsWith('where__')){
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        }
      } else if(key.startsWith('order__')){
        order = {
          ...order,
          ...this.parseOrderFilter(key, value),
        }
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page? dto.take * (dto.page-1) : null,
    }
  }

  private parseWhereFilter<T extends BaseModel>(key: string, value: any) : FindOptionsWhere<T>{

  }

  private parseOrderFilter<T extends BaseModel>(key: string, value: any) : FindOptionsWhere<T>{

  }
}
