import { Injectable } from '@nestjs/common';
import { CreateCareerDto, EditCareerDto } from './dto/career.dto';
import { Career } from './entities/career.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { groupBy } from '../../common/helpers/tools/array.helper';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private careersRepository: Repository<Career>,
  ) {}

  create(createCareerDto: CreateCareerDto): Promise<Career> {
    const career = new Career();

    career.name = createCareerDto.name;
    career.pathId = createCareerDto.pathId;
    career.parentCategoryId = createCareerDto.parentCategoryId ?? null;
    career.description = createCareerDto.description ?? '';
    career.color = createCareerDto.color ?? '';
    career.appreciations = createCareerDto.appreciations ?? '';
    career.promotion_eligibility = createCareerDto.promotion_eligibility ?? '';
    return this.careersRepository.save(career);
  }

  async findAll(status: boolean, take: number, skip: number) {
    const data = await this.careersRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(id: string) {
    const career = await this.careersRepository.findOneOrFail({
      where: { id },
      relations: ['expectations'],
    });
    career.expectations = groupBy(career.expectations, 'kpa');
    return career;
  }

  async update(id: string, editCareerDto: EditCareerDto) {
    const newCareer = {
      ...(await this.careersRepository.findOneOrFail({ where: { id } })),
      ...editCareerDto,
    };
    return this.careersRepository.save(newCareer);
  }

  async remove(id: string) {
    // await this.careersRepository.findOneOrFail(id);
    // const result = await this.careersRepository
    //   .createQueryBuilder()
    //   .update(Career)
    //   .set({
    //     parentCategoryId: null,
    //   })
    //   .where('parentCategoryId= :id', { id })
    //   .returning('*')
    //   .execute()
    //   .then((response) => {
    //     return response.raw[0];
    //   });

    await getConnection()
      .createQueryBuilder()
      .update(Career)
      .set({ parentCategoryId: null })
      .where('parentCategoryId= :id', { id })
      .execute();

    const deleteStatus = await this.careersRepository.delete(id);
    return { delete: deleteStatus.affected };
  }

  async findPathTree(id: string) {
    const career = await this.careersRepository.find({
      where: { pathId: id },
    });
    return this.list_to_tree(career);
  }

  public list_to_tree(list) {
    const map: any = {};
    const roots = [];
    for (let i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
    }
    for (const node of list) {
      if (node.parentCategoryId !== null) {
        list[map[node.parentCategoryId]].nextLevel =
          list[map[node.parentCategoryId]].nextLevel ?? [];
        list[map[node.parentCategoryId]].nextLevel!.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
}
