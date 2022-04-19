import { Injectable } from '@nestjs/common';
import { CreateTaskDto, EditTaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(userId: string, createUserDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.position = createUserDto.position;
    task.title = createUserDto.title;
    task.notes = createUserDto.notes;
    task.due_date = createUserDto.due_date;
    task.is_generated = createUserDto.is_generated;
    task.links = createUserDto.links ?? '{}';
    task.status = createUserDto.status;
    task.userId = userId;
    return this.tasksRepository.save(task);
  }

  async findAll(userId: string, status: boolean, take: number, skip: number) {
    const data = await this.tasksRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.tasksRepository.findOneOrFail(id, {
      where: { userId },
    });
  }

  async update(userId: string, id: string, editTaskDto: EditTaskDto) {
    const newTask = {
      ...(await this.tasksRepository.findOneOrFail(id, {
        where: { userId },
      })),
      ...editTaskDto,
    };
    return this.tasksRepository.save(newTask);
  }

  async remove(userId: string, id: string) {
    await this.tasksRepository.findOneOrFail(id, {
      where: { userId },
    });
    const deleteStatus = await this.tasksRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
