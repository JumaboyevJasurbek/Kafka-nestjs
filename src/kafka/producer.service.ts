import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable({})
export class ProducerService implements OnModuleInit {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    this.producer.disconnect
  }
}
