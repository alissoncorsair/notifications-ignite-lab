import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'This is a notification',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeInstanceOf(Notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationsRepository.notifications[0]);
  });
});
