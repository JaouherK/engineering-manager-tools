import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateReportSourcesDto,
  UpdateReportSourcesDto,
} from './dto/report-sources.dto';
import { ReportSources } from './entities/report-sources.entity';
import { GitlabIntegrations } from '../../common/helpers/integrations/gitlab.helper';
import { JiraHelper } from '../../common/helpers/integrations/jira.helper';
import { AzureOpenAIHelper } from 'src/common/helpers/integrations/azureOpenAI.helper';

@Injectable()
export class ReportSourcesService {
  constructor(
    @InjectRepository(ReportSources)
    private reportSourcesRepository: Repository<ReportSources>,
  ) {}

  async create(
    createReportSourceDto: CreateReportSourcesDto,
  ): Promise<ReportSources> {
    const reportSource = this.reportSourcesRepository.create(
      createReportSourceDto,
    );
    return this.reportSourcesRepository.save(reportSource);
  }

  async findOne(id: string, reportId: string): Promise<ReportSources> {
    return this.reportSourcesRepository.findOneOrFail({
      where: { id, reportId },
      relations: ['integration'],
    });
  }

  async findByReport(reportId: string): Promise<ReportSources[]> {
    return await this.reportSourcesRepository.find({
      where: { report: { id: reportId } },
      relations: ['integration'],
    });
  }

  async update(
    id: string,
    updateReportSourceDto: UpdateReportSourcesDto,
  ): Promise<ReportSources> {
    await this.reportSourcesRepository.update(id, updateReportSourceDto);
    return this.reportSourcesRepository.findOneOrFail({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.reportSourcesRepository.delete(id);
  }

  async findStatistics(reportId: string, sourceId: string) {
    return this.findOne(sourceId, reportId).then(async (a) => {
      const token = a.integration.auth_token;
      const userID = a.foreignId;
      const source = a.integration.endpoint;

      switch (a.integration.provider_name) {
        case 'gitlab':
          const integration = new GitlabIntegrations(
            source,
            token,
            userID,
            new Date(),
            new Date(),
          );

          return integration.getContributions();
        case 'jira':
          const j = new JiraHelper(source, token, userID);
          return await j.getJiraIssues();
        default:
          return {};
      }
    });
  }
}
