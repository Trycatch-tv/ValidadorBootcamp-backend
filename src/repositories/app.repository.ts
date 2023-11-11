import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
