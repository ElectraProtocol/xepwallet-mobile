// blockExplorer.ts
import DefaultPreference from 'react-native-default-preference';

export interface BlockExplorer {
  key: string;
  name: string;
  url: string;
}

export const BLOCK_EXPLORERS: { [key: string]: BlockExplorer } = {
  default: { key: 'default', name: 'Electra Protocol Explorer', url: 'https://explorer.electraprotocol.network' },
  custom: { key: 'custom', name: 'Custom', url: '' }, // Custom URL will be handled separately
};

export const transactionExplorerUrl = (explorer: BlockExplorer, txid: string): string =>
  `${normalizeUrl(explorer.url)}/${explorer.key === 'default' ? 'transaction' : 'tx'}/${txid}`;

export const getBlockExplorersList = (): BlockExplorer[] => {
  return Object.values(BLOCK_EXPLORERS);
};

export const normalizeUrl = (url: string): string => {
  return url.replace(/\/+$/, '');
};

export const isValidUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)/;
  return pattern.test(url);
};

export const findMatchingExplorerByDomain = (url: string): BlockExplorer | null => {
  const domain = getDomain(url);
  for (const explorer of Object.values(BLOCK_EXPLORERS)) {
    if (getDomain(explorer.url) === domain) {
      return explorer;
    }
  }
  return null;
};

export const getDomain = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const BLOCK_EXPLORER_STORAGE_KEY = 'blockExplorer';

export const saveBlockExplorer = async (url: string): Promise<boolean> => {
  try {
    await DefaultPreference.set(BLOCK_EXPLORER_STORAGE_KEY, url);
    return true;
  } catch (error) {
    console.error('Error saving block explorer:', error);
    return false;
  }
};

export const removeBlockExplorer = async (): Promise<boolean> => {
  try {
    await DefaultPreference.clear(BLOCK_EXPLORER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error removing block explorer:', error);
    return false;
  }
};

export const getBlockExplorerUrl = async (): Promise<string> => {
  try {
    const url = (await DefaultPreference.get(BLOCK_EXPLORER_STORAGE_KEY)) as string | null;
    if (!url || ['https://mempool.space', 'https://blockchair.com/bitcoin', 'https://blockstream.info'].includes(normalizeUrl(url))) {
      return BLOCK_EXPLORERS.default.url;
    }
    return url;
  } catch (error) {
    console.error('Error getting block explorer:', error);
    return BLOCK_EXPLORERS.default.url;
  }
};
