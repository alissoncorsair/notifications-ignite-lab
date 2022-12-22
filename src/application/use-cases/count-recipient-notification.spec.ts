import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count how many notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
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

    const { count } = await countRecipientNotification.execute({
      recipientId: 'teste123',
    });

    expect(count).toBe(2);
  });
});
