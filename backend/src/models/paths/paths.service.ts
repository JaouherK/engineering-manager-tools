import { Injectable } from '@nestjs/common';
import { CreatePathDto, EditPathDto } from './dto/path.dto';
import { Path } from './entities/path.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class PathsService {
  constructor(
    @InjectRepository(Path)
    private pathsRepository: Repository<Path>,
  ) {}

  create(userId: string, createUserDto: CreatePathDto): Promise<Path> {
    const path = new Path();

    path.name = createUserDto.name;
    path.description = createUserDto.description ?? '';
    path.private = createUserDto.private ?? false;
    path.companyId = createUserDto.companyId;
    path.type = createUserDto.type;
    path.userId = userId;
    return this.pathsRepository.save(path);
  }

  async findAll(
    userId: string,
    companyId: string,
    status: boolean,
    take: number,
    skip: number,
  ) {
    let data;
    if (status) {
      data = await this.pathsRepository.findAndCount({
        where: { companyId, userId },
        order: { createdAt: 'DESC' },
        take,
        skip,
      });
    } else {
      data = await this.pathsRepository.findAndCount({
        where: { companyId },
        order: { createdAt: 'DESC' },
        take,
        skip,
      });
    }
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(id: string) {
    return await this.pathsRepository.findOneOrFail({
      where: { id },
      relations: ['careers'],
    });
  }

  async update(userId: string, id: string, editPathDto: EditPathDto) {
    const newPath = {
      ...(await this.pathsRepository.findOneOrFail({
        where: { id, userId },
      })),
      ...editPathDto,
    };
    return this.pathsRepository.save(newPath);
  }

  async remove(userId: string, id: string) {
    await this.pathsRepository.findOneOrFail({
      where: { id, userId },
    });
    const deleteStatus = await this.pathsRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
