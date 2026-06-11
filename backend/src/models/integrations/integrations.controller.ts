import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  HttpCode,
  Request,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import {
  CreateIntegrationDto,
  EditIntegrationDto,
} from './dto/integration.dto';

@Controller('@me/integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  async createIntegration(
    @Request() req,
    @Body() createIntegrationDto: CreateIntegrationDto,
  ) {
    return this.integrationsService.createIntegration(
      req.user.userId,
      createIntegrationDto,
    );
  }

  @Get()
  async findAllIntegrations(
    @Request() req,
    @Query('take') take = 10,
    @Query('skip') skip = 0,
  ) {
    return this.integrationsService.findAllIntegrations(
      req.user.userId,
      take,
      skip,
    );
  }

  @Get(':id')
  async findOneIntegration(@Request() req, @Param('id') integrationId: string) {
    return this.integrationsService.findOneIntegration(
      req.user.userId,
      integrationId,
    );
  }

  @Patch(':id')
  async updateIntegration(
    @Request() req,
    @Param('id') integrationId: string,
    @Body() editIntegrationDto: EditIntegrationDto,
  ) {
    return this.integrationsService.updateIntegration(
      req.user.userId,
      integrationId,
      editIntegrationDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async removeIntegration(@Request() req, @Param('id') integrationId: string) {
    await this.integrationsService.removeIntegration(
      req.user.userId,
      integrationId,
    );
  }
}
