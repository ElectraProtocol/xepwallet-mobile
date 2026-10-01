// Ark wallet features are unavailable in XEP Wallet. Retain the action helper
// for legacy callers, but never post local notifications or load a native SDK.
import { isChainSwapClaimable, isChainSwapRefundable, isReverseSwapClaimable, isSubmarineSwapRefundable } from '@arkade-os/boltz-swap';
import type { BoltzSwap } from '@arkade-os/boltz-swap';
import type {
  RealmNotificationSuppressionRepository,
  ArkSwapNotificationAction,
} from './arkade-adapters/realm/notificationSuppressionRepository';

export const ARK_SWAP_NOTIFICATION_TYPE = 100;

export function ensureArkNotificationChannel(): void {}

export function resolveActionableAction(swap: BoltzSwap): ArkSwapNotificationAction | null {
  if (isReverseSwapClaimable(swap) || isChainSwapClaimable(swap)) return 'claim';
  if (isSubmarineSwapRefundable(swap) || isChainSwapRefundable(swap)) return 'refund';
  return null;
}

export async function notifyArkSwapActionable(
  _swap: BoltzSwap,
  _suppression: RealmNotificationSuppressionRepository,
  _walletID: string,
  _walletLabel: string,
): Promise<void> {}

export const __testing__ = {
  resetChannel: (): void => {},
  setAppStateForTest: (_state: string | null): void => {},
  setPermissionResultForTest: (_result: string | null): void => {},
  setOptOutFlagForTest: (_value: string | null | undefined): void => {},
};
