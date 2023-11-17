import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DbModule } from './typeorm/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ConfigModule.forRoot(),
    RouterModule.register([
      {
        path: '',
        module: AppModule,
      },
      {
        path: 'users',
        module: UsersModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
