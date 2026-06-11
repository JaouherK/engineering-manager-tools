import { Injectable } from '@nestjs/common';
import { CreateSalaryDto, EditSalaryDto } from './dto/salary.dto';
import { Salary } from './entities/salary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salary)
    private salariesRepository: Repository<Salary>,
  ) {}

  resetSalaries(reportId: string) {
    return getConnection()
      .createQueryBuilder()
      .update(Salary)
      .set({ current: false })
      .where('reportId = :id', { id: reportId })
      .where('current = :current', { current: true })
      .execute();
  }

  create(createSalaryDto: CreateSalaryDto): Promise<Salary> {
    const salary = new Salary();

    salary.salary = createSalaryDto.salary;
    salary.reportId = createSalaryDto.reportId;
    salary.current = true;
    return this.salariesRepository.save(salary);
  }

  async findAllByReport(
    reportId: string,
    status: boolean,
    take: number,
    skip: number,
  ) {
    const data = await this.salariesRepository.findAndCount({
      where: { reportId },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(id: string) {
    return await this.salariesRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, editSalaryDto: EditSalaryDto) {
    const newSalary = {
      ...(await this.salariesRepository.findOneOrFail({ where: { id } })),
      ...editSalaryDto,
    };
    return this.salariesRepository.save(newSalary);
  }

  async remove(id: string) {
    await this.salariesRepository.findOneOrFail({ where: { id } });
    const deleteStatus = await this.salariesRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
