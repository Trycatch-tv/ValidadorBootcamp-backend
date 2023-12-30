import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesClient } from 'src/clients/files/files.client';
import { BootcampsController } from 'src/controllers/bootcamps/bootcamps.controller';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { FeatureEntity } from 'src/models/feature/feature.entity';
import { FileEntity } from 'src/models/file/file.entity';
import { OfficeEntity } from 'src/models/office/office.entity';
import { PricingProgramEntity } from 'src/models/program/pricing/pricing.program.entity';
import { ProgramEntity } from 'src/models/program/program.entity';
import { SegmentSectionEntity } from 'src/models/program/segment/section/section.segment.program.entity';
import { SegmentProgramEntity } from 'src/models/program/segment/segment.program.entity';
import { ReviewEntity } from 'src/models/review/review.entity';
import { TestimonialEntity } from 'src/models/testimonial/testimonial.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { BootcampsService } from 'src/services/bootcamps/bootcamps.service';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      BootcampEntity,
      UserEntity,
      FileEntity,
      BootcampEntity,
      FeatureEntity,
      OfficeEntity,
      ProgramEntity,
      PricingProgramEntity,
      SegmentProgramEntity,
      SegmentSectionEntity,
      ReviewEntity,
      TestimonialEntity,
    ]),
  ],
  controllers: [BootcampsController],
  providers: [BootcampsService, FilesClient, EnvironmentConfigService],
  exports: [TypeOrmModule],
})
export class BootcampsModule {}
