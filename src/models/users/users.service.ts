import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { CreateUserDto, EditUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.username = createUserDto.last_name;
    user.password = createUserDto.password;
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
    return await this.usersRepository.findOneOrFail(id);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username,
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
