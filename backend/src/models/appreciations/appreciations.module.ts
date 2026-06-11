import { Module } from '@nestjs/common';
import { AppreciationsService } from './appreciations.service';
import { AppreciationsController } from './appreciations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appreciation } from './entities/appreciation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appreciation])],
  controllers: [AppreciationsController],
  providers: [AppreciationsService],
})
export class AppreciationsModule {}
