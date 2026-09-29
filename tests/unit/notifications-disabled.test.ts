import {
  getDeliveredNotifications,
  initializeNotifications,
  PUSH_NOTIFICATIONS_ENABLED,
  removeAllDeliveredNotifications,
  removeDeliveredNotifications,
  setApplicationIconBadgeNumber,
} from '../../blue_modules/notifications';

describe('disabled push notifications', () => {
  it('does not initialize or access the native notifications module', async () => {
    expect(PUSH_NOTIFICATIONS_ENABLED).toBe(false);
    await expect(initializeNotifications()).resolves.toBeUndefined();
    await expect(getDeliveredNotifications()).resolves.toEqual([]);
    expect(() => removeDeliveredNotifications()).not.toThrow();
    expect(() => setApplicationIconBadgeNumber(0)).not.toThrow();
    expect(() => removeAllDeliveredNotifications()).not.toThrow();
  });
});
