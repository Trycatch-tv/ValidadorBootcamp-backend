import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DbModule } from './typeorm/db.module';
import { UsersModule } from './users/users.module';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Module({
  imports: [
    DbModule,
    UsersModule,
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
        path: 'users',
        module: UsersModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersModule, EnvironmentConfigService],
})
export class AppModule {}
