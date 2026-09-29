import { AbstractWallet } from '../../class/wallets/abstract-wallet';
import { balanceUnitForXepWallet, BitcoinUnit, nextXepWalletBalanceUnit } from '../../models/bitcoinUnits';

describe('XEP balance units', () => {
  it('alternates between XEP and fiat, including a legacy sats preference', () => {
    expect(nextXepWalletBalanceUnit(BitcoinUnit.BTC)).toBe(BitcoinUnit.LOCAL_CURRENCY);
    expect(nextXepWalletBalanceUnit(BitcoinUnit.LOCAL_CURRENCY)).toBe(BitcoinUnit.BTC);
    expect(nextXepWalletBalanceUnit(BitcoinUnit.SATS)).toBe(BitcoinUnit.LOCAL_CURRENCY);
  });

  it('normalizes stored sats without changing the persisted BTC identifier', () => {
    expect(balanceUnitForXepWallet(BitcoinUnit.SATS)).toBe(BitcoinUnit.BTC);
    const wallet = new AbstractWallet();
    wallet.preferredBalanceUnit = BitcoinUnit.SATS;
    expect(wallet.getPreferredBalanceUnit()).toBe(BitcoinUnit.BTC);
    wallet.setPreferredBalanceUnit(BitcoinUnit.SATS);
    expect(wallet.preferredBalanceUnit).toBe(BitcoinUnit.BTC);
    wallet.setPreferredBalanceUnit(BitcoinUnit.LOCAL_CURRENCY);
    expect(wallet.getPreferredBalanceUnit()).toBe(BitcoinUnit.LOCAL_CURRENCY);
  });
});
