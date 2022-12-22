import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a new notification', () => {
    const content = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: '123456',
    });

    expect(content).toBeTruthy();
  });
});
