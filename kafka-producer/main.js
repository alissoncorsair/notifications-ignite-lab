import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';
import * as dotenv from 'dotenv';

dotenv.config();

bootstrap();

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['wise-moray-9622-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'd2lzZS1tb3JheS05NjIyJPACDk46TG371f8_vZu7A98qWnkqPvVHv2OkyQZOazA',
      password: process.env.KAFKA_PASSWORD,
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'algum conteudo',
          category: 'categoria',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}
