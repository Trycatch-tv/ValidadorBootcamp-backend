import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DbModule } from './typeorm/db.module';
import { UsersModule } from './users/users.module';
import { BootcampsModule } from './bootcamps/bootcamps.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    BootcampsModule,
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
      ,
      {
        path: '',
        module: BootcampsModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
