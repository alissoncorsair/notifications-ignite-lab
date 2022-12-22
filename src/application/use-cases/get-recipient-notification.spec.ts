import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count how many notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'teste123' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'teste123' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'teste321' }),
    );

    const { notifications } = await countRecipientNotification.execute({
      recipientId: 'teste123',
    });

    expect(notifications.length).toBe(2);
  });
});
