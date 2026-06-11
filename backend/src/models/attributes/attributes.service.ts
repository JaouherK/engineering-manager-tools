import { Injectable } from '@nestjs/common';
import { CreateAttributeDto, EditAttributeDto } from './dto/attribute';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { Attribute } from './entities/attribute';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
  ) {}

  create(createUserDto: CreateAttributeDto): Promise<Attribute> {
    const attribute = new Attribute();

    attribute.type = createUserDto.type;
    attribute.reportId = createUserDto.reportId;
    attribute.content = createUserDto.content;
    attribute.cssClass = createUserDto.cssClass ?? '';
    attribute.color = createUserDto.color ?? 'rgb(0, 0, 0)';
    attribute.notes = createUserDto.notes ?? '';
    return this.attributesRepository.save(attribute);
  }

  async findAllByReport(reportId: string, type: string) {
    const whereIs = type ? { reportId, type } : { reportId };
    const data = await this.attributesRepository.findAndCount({
      where: whereIs,
      order: { createdAt: 'DESC' },
    });

    return new PaginationHelper().paginateResponse(data, 100, 0);
  }

  async findOne(id: string) {
    return await this.attributesRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, editAttributeDto: EditAttributeDto) {
    const newAttribute = {
      ...(await this.attributesRepository.findOneOrFail({ where: { id } })),
      ...editAttributeDto,
    };
    return this.attributesRepository.save(newAttribute);
  }

  async remove(id: string) {
    await this.attributesRepository.findOneOrFail({ where: { id } });
    const deleteStatus = await this.attributesRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
