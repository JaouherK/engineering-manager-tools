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

  create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.position = createTaskDto.position;
    task.title = createTaskDto.title;
    task.notes = createTaskDto.notes;
    task.dueDate = createTaskDto.dueDate;
    task.isGenerated = createTaskDto.isGenerated;
    task.links = createTaskDto.links ?? '{}';
    task.status = createTaskDto.status;
    task.userId = userId;
    return this.tasksRepository.save(task);
  }

  async findAll(userId: string, status: boolean, take: number, skip: number) {
    const data = await this.tasksRepository.findAndCount({
      where: { userId },
      order: { status: 'DESC', dueDate: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.tasksRepository.findOneOrFail({
      where: { id, userId },
    });
  }

  async update(userId: string, id: string, editTaskDto: EditTaskDto) {
    const newTask = {
      ...(await this.tasksRepository.findOneOrFail({
        where: { id, userId },
      })),
      ...editTaskDto,
    };
    return this.tasksRepository.save(newTask);
  }

  async remove(userId: string, id: string) {
    await this.tasksRepository.findOneOrFail({
      where: { id, userId },
    });
    const deleteStatus = await this.tasksRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
