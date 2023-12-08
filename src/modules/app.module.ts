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
        path: '', //Si se pone el path de /users acá, no se puede poner el nombre en el controlador.
        module: UsersModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
