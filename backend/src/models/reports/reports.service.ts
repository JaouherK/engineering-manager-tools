import { Injectable } from '@nestjs/common';
import { CreateReportDto, EditReportDto } from './dto/repot.dto';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  create(userId: string, createUserDto: CreateReportDto): Promise<Report> {
    const report = new Report();

    report.email = createUserDto.email;
    report.firstName = createUserDto.firstName;
    report.lastName = createUserDto.lastName;
    report.preferredName = createUserDto.preferredName;
    report.gender = createUserDto.gender ?? 'unknown';
    report.situation = createUserDto.situation ?? 'active';
    report.country = createUserDto.country;
    report.religion = createUserDto.religion;
    report.mobile = createUserDto.mobile;
    report.status = createUserDto.status;
    report.userId = userId;
    return this.reportsRepository.save(report);
  }

  async findAll(
    userId: string,
    status: boolean,
    situation: string,
    take: number,
    skip: number,
  ) {
    const data = await this.reportsRepository.findAndCount({
      where: { userId, situation },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.reportsRepository.findOneOrFail({
      where: { id, userId },
      relations: ['career'],
    });
  }

  async update(userId: string, id: string, editReportDto: EditReportDto) {
    const newReport = {
      ...(await this.reportsRepository.findOneOrFail({
        where: { id, userId },
      })),
      ...editReportDto,
    };
    return this.reportsRepository.save(newReport);
  }

  async remove(userId: string, id: string) {
    await this.reportsRepository.findOneOrFail({
      where: { id, userId },
    });
    const deleteStatus = await this.reportsRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
