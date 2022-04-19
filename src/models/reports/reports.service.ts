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
    report.first_name = createUserDto.first_name;
    report.last_name = createUserDto.last_name;
    report.status = createUserDto.status;
    report.userId = userId;
    return this.reportsRepository.save(report);
  }

  async findAll(userId: string, status: boolean, take: number, skip: number) {
    const data = await this.reportsRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.reportsRepository.findOneOrFail(id, {
      where: { userId },
    });
  }

  async update(userId: string, id: string, editReportDto: EditReportDto) {
    const newReport = {
      ...(await this.reportsRepository.findOneOrFail(id, {
        where: { userId },
      })),
      ...editReportDto,
    };
    return this.reportsRepository.save(newReport);
  }

  async remove(userId: string, id: string) {
    await this.reportsRepository.findOneOrFail(id, {
      where: { userId },
    });
    const deleteStatus = await this.reportsRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
