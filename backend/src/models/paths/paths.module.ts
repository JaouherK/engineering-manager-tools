import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  controllers: [PathsController],
  providers: [PathsService],
})
export class PathsModule {}
