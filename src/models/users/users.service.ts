import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { HashHelper } from '../../common/helpers/tools/hash.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const hash = new HashHelper();
    user.email = createUserDto.email;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.username = createUserDto.username;
    user.password = await hash.hash(createUserDto.password);
    user.status = createUserDto.status;
    return this.usersRepository.save(user);
  }

  async findAll(status: boolean, take: number, skip: number) {
    const data = await this.usersRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneOrFail(id, {
      relations: ['companies'],
    });
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username,
        status: true,
      },
    });
  }

  async update(id: string, editReportDto: EditUserDto) {
    const newReport = {
      ...(await this.usersRepository.findOne(id)),
      ...editReportDto,
    };
    return this.usersRepository.save(newReport);
  }

  async remove(id: string) {
    const deleteStatus = await this.usersRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
