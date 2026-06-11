import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';
import { CreateUserDto, EditUserDto, UpdatePasswordDTO } from './dto/user.dto';
import { HashHelper } from '../../common/helpers/tools/hash.helper';
import { BadRequestException } from '../../common/exceptions/bad-request.exception';

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
    const user = await this.usersRepository.findOneOrFail({
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        dob: true,
        photo: true,
      },
      where: { id },
      relations: ['companies'],
    });
    delete user.password;
    return user;
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
      ...(await this.usersRepository.findOne({
        where: { id },
      })),
      ...{
        email: editReportDto.email,
        first_name: editReportDto.first_name,
        last_name: editReportDto.last_name,
        photo: editReportDto.photo,
        wallBg: editReportDto.wallBg,
        dob: editReportDto.dob,
      },
    };
    return this.usersRepository.save(newReport);
  }

  async remove(id: string) {
    const deleteStatus = await this.usersRepository.delete(id);
    return { delete: deleteStatus.affected };
  }

  async updatePassword(id, updatePasswordDto: UpdatePasswordDTO) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    const hash = new HashHelper();

    if (
      user &&
      (await hash.compare(updatePasswordDto.currentPassword, user.password))
    ) {
      user.password = await hash.hash(updatePasswordDto.password);
      this.usersRepository.save(user).then((v) => {});
    }
    throw new BadRequestException('Wrong Password');
  }
}
