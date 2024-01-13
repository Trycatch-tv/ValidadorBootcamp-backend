import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { BootcampsModule } from './bootcamps/bootcamps.module';
import { FilesModule } from './files/files.module';
import { ProgramsModule } from './programs/programs.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DbModule } from './typeorm/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HttpModule,
    DbModule,
    UsersModule,
    BootcampsModule,
    FilesModule,
    ReviewsModule,
    ProgramsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.develop'],
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: '',
        module: AppModule,
      },
      {
        path: '',
        module: UsersModule,
      },
      {
        path: '',
        module: BootcampsModule,
      },
      {
        path: '',
        module: FilesModule,
      },
      {
        path: '',
        module: ReviewsModule,
      },
      {
        path: '',
        module: ProgramsModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
