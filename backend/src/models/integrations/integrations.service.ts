import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Integration } from './entities/integration.entity';
import {
  CreateIntegrationDto,
  EditIntegrationDto,
} from './dto/integration.dto';
import { PaginationHelper } from '../../common/helpers/response/pagination.helper';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private readonly integrationRepository: Repository<Integration>,
  ) {}

  async createIntegration(
    userId: string,
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    const integration = this.integrationRepository.create({
      ...{ userId },
      ...createIntegrationDto,
    });

    return await this.integrationRepository.save(integration);
  }

  async findAllIntegrations(userId: string, take: number, skip: number) {
    const data = await this.integrationRepository.findAndCount({
      where: { userId },
      order: { provider_name: 'ASC' },
      take,
      skip,
    });
    return new PaginationHelper().paginateResponse(data, take, skip);
  }

  async findOneIntegration(
    userId: string,
    integrationId: string,
  ): Promise<Integration> {
    return await this.integrationRepository.findOneOrFail({
      where: { uuid: integrationId, userId },
    });
  }

  async updateIntegration(
    userId: string,
    integrationId: string,
    editIntegrationDto: EditIntegrationDto,
  ): Promise<Integration> {
    const integration = await this.findOneIntegration(userId, integrationId);
    const updatedIntegration = this.integrationRepository.merge(
      integration,
      editIntegrationDto,
    );
    return await this.integrationRepository.save(updatedIntegration);
  }

  async removeIntegration(
    userId: string,
    integrationId: string,
  ): Promise<void> {
    const integration = await this.findOneIntegration(userId, integrationId);
    await this.integrationRepository.remove(integration);
  }
}
