import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { createNotificationDTO } from '../dtos/createNotificationDTO';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Post()
  async create(@Body() data: createNotificationDTO) {
    const { category, content, recipientId } = data;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    return await this.cancelNotification.execute({
      notificationId: notificationId,
    });
  }

  @Get(':id/recipient')
  async countFromRecipient(@Param('id') recipientId: string) {
    return await this.countRecipientNotification.execute({
      recipientId: recipientId,
    });
  }

  @Get(':id')
  async getFromRecipient(@Param('id') recipientId: string) {
    return await this.getRecipientNotification.execute({ recipientId });
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    return await this.readNotification.execute({
      notificationId,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    return await this.unreadNotification.execute({
      notificationId,
    });
  }
}
