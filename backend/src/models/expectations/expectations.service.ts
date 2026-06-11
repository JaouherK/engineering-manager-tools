import { Injectable } from '@nestjs/common';
import {
  CreateExpectationDto,
  EditExpectationDto,
} from './dto/expectation.dto';
import { Expectation } from './entities/expectation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpectationsService {
  constructor(
    @InjectRepository(Expectation)
    private expectationsRepository: Repository<Expectation>,
  ) {}

  create(createExpectationDto: CreateExpectationDto): Promise<Expectation> {
    const expectation = new Expectation();

    expectation.kpa = createExpectationDto.kpa ?? '';
    expectation.kpi = createExpectationDto.kpi;
    expectation.careerId = createExpectationDto.careerId;
    return this.expectationsRepository.save(expectation);
  }

  async findOne(id: string) {
    return await this.expectationsRepository.findOneOrFail({
      where: { id },
      relations: ['careers'],
    });
  }

  async update(id: string, editExpectationDto: EditExpectationDto) {
    const newExpectation = {
      ...(await this.expectationsRepository.findOneOrFail({ where: { id } })),
      ...editExpectationDto,
    };
    return this.expectationsRepository.save(newExpectation);
  }

  async remove(id: string) {
    await this.expectationsRepository.findOneOrFail({ where: { id } });
    const deleteStatus = await this.expectationsRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
