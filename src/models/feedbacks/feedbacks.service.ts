import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto, EditFeedbackDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbacksRepository: Repository<Feedback>,
  ) {}

  create(userId: string, createUserDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = new Feedback();

    feedback.feedback = createUserDto.feedback;
    feedback.reportId = createUserDto.reportId;
    feedback.userId = userId;
    return this.feedbacksRepository.save(feedback);
  }

  async findAllByReport(
    userId: string,
    reportId: string,
    status: boolean,
    take: number,
    skip: number,
  ) {
    const data = await this.feedbacksRepository.findAndCount({
      where: { userId, reportId },
      order: { createdAt: 'DESC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.feedbacksRepository.findOneOrFail(id, {
      where: { userId },
    });
  }

  async update(userId: string, id: string, editFeedbackDto: EditFeedbackDto) {
    const newFeedback = {
      ...(await this.feedbacksRepository.findOneOrFail(id, {
        where: { userId },
      })),
      ...editFeedbackDto,
    };
    return this.feedbacksRepository.save(newFeedback);
  }

  async remove(userId: string, id: string) {
    await this.feedbacksRepository.findOneOrFail(id, {
      where: { userId },
    });
    const deleteStatus = await this.feedbacksRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
