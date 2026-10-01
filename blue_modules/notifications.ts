// Push notifications are not supported by XEP Wallet. Keep these inert exports
// until the legacy call sites are removed; no native notification SDK is loaded.
export const NOTIFICATIONS_NO_AND_DONT_ASK_FLAG = 'NOTIFICATIONS_NO_AND_DONT_ASK_FLAG';
export const PUSH_NOTIFICATIONS_ENABLED = false;
export const isNotificationsCapable = false;

export const checkNotificationPermissionStatus = async (): Promise<string> => 'unavailable';
export const cleanUserOptOutFlag = async (): Promise<void> => {};
export const tryToObtainPermissions = async (): Promise<boolean> => false;
export const enqueueTestPushNotification = async (): Promise<void> => {};
export const majorTomToGroundControl = async (_addresses: string[], _hashes: string[], _txids: string[]): Promise<void> => {};
export const registerArkPaymentPush = async (_paymentHash: string, _label: string, _pendingSwap: unknown): Promise<void> => {};
export const checkPermissions = async () => ({ alert: false, badge: false, sound: false, status: 'unavailable' });
export const setLevels = async (_levelAll: boolean): Promise<void> => {};
export const setRedactNotifications = async (_redacted: boolean): Promise<void> => {};
export const isNotificationsRedacted = async (): Promise<boolean> => false;
export const addNotification = async (_notification: Record<string, unknown>): Promise<void> => {};
export const getPushToken = async (): Promise<null> => null;
export const unsubscribe = async (_addresses: string[], _hashes: string[], _txids: string[]): Promise<void> => {};
export const clearStoredNotifications = async (): Promise<void> => {};
export const getDeliveredNotifications = async (): Promise<Record<string, any>[]> => [];
export const removeDeliveredNotifications = (_identifiers: string[] = []): void => {};
export const setApplicationIconBadgeNumber = (_badges: number): void => {};
export const removeAllDeliveredNotifications = (): void => {};
export const isNotificationsEnabled = async (): Promise<boolean> => false;
export const getStoredNotifications = async (): Promise<Record<string, any>[]> => [];
export const initializeNotifications = async (_onProcessNotifications?: () => void): Promise<void> => {};
