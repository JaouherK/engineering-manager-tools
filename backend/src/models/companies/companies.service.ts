import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { CreateCompanyDto, EditCompanyDto } from './dto/company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.logo_url = createCompanyDto.logo_url;
    company.status = createCompanyDto.status;
    return this.companiesRepository.save(company);
  }

  async findAll(status: boolean, take: number, skip: number, name: string) {
    const data = await this.companiesRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(id: string) {
    return await this.companiesRepository.findOneOrFail({
      where: { id },
      relations: ['users'],
    });
  }

  async update(id: string, editReportDto: EditCompanyDto) {
    const newReport = {
      ...(await this.companiesRepository.findOne({ where: { id } })),
      ...editReportDto,
    };
    return this.companiesRepository.save(newReport);
  }

  async remove(id: string) {
    const deleteStatus = await this.companiesRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
