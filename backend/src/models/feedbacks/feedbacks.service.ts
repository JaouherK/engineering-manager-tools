import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto, EditFeedbackDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbacksRepository: Repository<Feedback>,
  ) { }

  create(userId: string, createUserDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = new Feedback();

    feedback.feedback = createUserDto.feedback;
    feedback.reportId = createUserDto.reportId;
    feedback.expectationId = createUserDto.expectationId;
    feedback.userId = userId;
    return this.feedbacksRepository.save(feedback);
  }

  async findAllByReport(
    userId: string,
    reportId: string,
    expectationId: string,
    take: number,
    skip: number,
    fromDate?: string,
    toDate?: string,
  ) {
    const whereIs: any = expectationId
      ? { userId, reportId, expectationId }
      : { userId, reportId };

    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    // If both fromDate and toDate are present, use BETWEEN operator
    if (fromDateObj && toDateObj) {
      whereIs.createdAt = Between(fromDateObj, toDateObj);
    }
    // Otherwise handle single-edge constraints
    else if (fromDateObj) {
      whereIs.createdAt = MoreThanOrEqual(fromDateObj);
    }
    else if (toDateObj) {
      whereIs.createdAt = LessThanOrEqual(toDateObj);
    }

    const data = await this.feedbacksRepository.findAndCount({
      where: whereIs,
      relations: ['expectation'],
      order: { createdAt: 'DESC' },
      take,
      skip,
    });

    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOne(userId: string, id: string) {
    return await this.feedbacksRepository.findOneOrFail({
      where: { id, userId },
    });
  }

  async update(userId: string, id: string, editFeedbackDto: EditFeedbackDto) {
    const newFeedback = {
      ...(await this.feedbacksRepository.findOneOrFail({
        where: { id, userId },
      })),
      ...editFeedbackDto,
    };
    return this.feedbacksRepository.save(newFeedback);
  }

  async remove(userId: string, id: string) {
    await this.feedbacksRepository.findOneOrFail({
      where: { id, userId },
    });
    const deleteStatus = await this.feedbacksRepository.delete(id);
    return { delete: deleteStatus.affected };
  }
}
