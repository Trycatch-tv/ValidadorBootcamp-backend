import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootcampsClient } from 'src/clients/bottcamps/bootcamps.client';
import { AssessmentsController } from 'src/controllers/assessments/assessments.controller';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { AssessmentsService } from 'src/services/assessments/assessments.service';
import { jwtConstants } from 'src/utils/jwt/constants.jwt';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,

      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([AssessmentEntity]),
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService, BootcampsClient],
})
export class AssessmentsModule {}
