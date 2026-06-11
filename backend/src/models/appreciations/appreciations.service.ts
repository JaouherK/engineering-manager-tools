import { Injectable } from '@nestjs/common';
import { AppreciationDto } from './dto/appreciation.dto';
import { Appreciation } from './entities/appreciation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppreciationsService {
  constructor(
    @InjectRepository(Appreciation)
    private appreciationsRepository: Repository<Appreciation>,
  ) {}

  async create(appreciationDto: AppreciationDto): Promise<Appreciation> {
    const appreciation =
      (await this.appreciationsRepository.findOne({
        select: ['id', 'appreciation', 'reportId', 'expectationId'],
        where: {
          expectationId: appreciationDto.expectationId,
          reportId: appreciationDto.reportId,
        },
      })) ?? appreciationDto;

    appreciation.appreciation = appreciationDto.appreciation;
    return this.appreciationsRepository.save(appreciation);
  }

  async findAllByReportCareer(reportId: string, expectationId: string) {
    return await this.appreciationsRepository.findOne({
      where: { expectationId, reportId },
    });
  }

  async findOne(id: string) {
    return await this.appreciationsRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.appreciationsRepository.findOneOrFail({ where: { id } });
    const deleteStatus = await this.appreciationsRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
