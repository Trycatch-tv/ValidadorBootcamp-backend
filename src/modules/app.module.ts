import { Module } from '@nestjs/common';
import { AppReository } from 'src/repositories/app.repository';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppReository],
})
export class AppModule {}
