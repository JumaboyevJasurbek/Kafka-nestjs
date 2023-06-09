import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consume = this.kafka.consumer({ groupId: 'nestjs-kafka' });

    consume.connect();
    consume.subscribe(topic);   
    consume.run(config);
    this.consumers.push(consume);
  }

  async onApplicationShutdown(signal?: string) {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
