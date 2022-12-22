import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotification } from '@application/use-cases/send-notification';

interface sendNotificationDTO {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { category, content, recipientId }: sendNotificationDTO,
  ) {
    try {
      this.sendNotification.execute({
        category,
        content,
        recipientId,
      });
      console.log('uma notificação foi salva através do kafka');
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        console.log('erro ao tentar salvar!');
      }
    }
  }
}
