import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async statusCheck(): Promise<any> {
    return {
      environment: process.env.ENVIRONMENT,
      errorCode: 0,
      message: "API's status is active"
    };
  }
}
