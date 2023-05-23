import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumers implements OnModuleInit {
  constructor(private consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['test'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
        },
      },
    );
  }
}
