import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsClient } from 'src/clients/assessments/assessments.client';
import { FilesClient } from 'src/clients/files/files.client';
import { ReviewsClient } from 'src/clients/reviews/reviews.client';
import { BootcampsController } from 'src/controllers/bootcamps/bootcamps.controller';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { FeatureEntity } from 'src/models/feature/feature.entity';
import { FileEntity } from 'src/models/file/file.entity';
import { OfficeEntity } from 'src/models/office/office.entity';
import { ProgramEntity } from 'src/models/program/program.entity';
import { SegmentSectionEntity } from 'src/models/program/segment/section/section.segment.program.entity';
import { SegmentProgramEntity } from 'src/models/program/segment/segment.program.entity';
import { ReviewEntity } from 'src/models/review/review.entity';
import { TestimonialEntity } from 'src/models/testimonial/testimonial.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { BootcampsService } from 'src/services/bootcamps/bootcamps.service';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { jwtConstants } from 'src/utils/jwt/constants.jwt';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,

      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([
      BootcampEntity,
      UserEntity,
      FileEntity,
      BootcampEntity,
      FeatureEntity,
      OfficeEntity,
      ProgramEntity,
      SegmentProgramEntity,
      SegmentSectionEntity,
      ReviewEntity,
      TestimonialEntity,
    ]),
  ],
  controllers: [BootcampsController],
  providers: [
    BootcampsService,
    FilesClient,
    ReviewsClient,
    AssessmentsClient,
    EnvironmentConfigService,
  ],
  exports: [TypeOrmModule],
})
export class BootcampsModule {}
