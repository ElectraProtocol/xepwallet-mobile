import { ensureArkNotificationChannel, notifyArkSwapActionable } from '../../blue_modules/arkade-notifications';

describe('disabled Ark notifications', () => {
  it('never registers a channel or posts a notification', async () => {
    expect(() => ensureArkNotificationChannel()).not.toThrow();
    await expect(notifyArkSwapActionable({} as never, {} as never, 'wallet-id', 'Wallet')).resolves.toBeUndefined();
  });
});
