export const BitcoinUnit = {
  BTC: 'BTC',
  SATS: 'sats',
  LOCAL_CURRENCY: 'local_currency',
  MAX: 'MAX',
} as const;
export type BitcoinUnit = (typeof BitcoinUnit)[keyof typeof BitcoinUnit];

// Keep the persisted BTC identifier for existing wallets; XEP is its UI label.
export const balanceUnitForXepWallet = (unit: BitcoinUnit): BitcoinUnit =>
  unit === BitcoinUnit.LOCAL_CURRENCY ? BitcoinUnit.LOCAL_CURRENCY : BitcoinUnit.BTC;

export const nextXepWalletBalanceUnit = (unit: BitcoinUnit): BitcoinUnit =>
  unit === BitcoinUnit.LOCAL_CURRENCY ? BitcoinUnit.BTC : BitcoinUnit.LOCAL_CURRENCY;

export const Chain = {
  ONCHAIN: 'ONCHAIN',
  OFFCHAIN: 'OFFCHAIN',
} as const;
export type Chain = (typeof Chain)[keyof typeof Chain];
