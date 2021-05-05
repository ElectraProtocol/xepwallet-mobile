import Frisbee from 'frisbee';

export const FiatUnitSource = Object.freeze({
  CoinDesk: 'CoinDesk',
  Yadio: 'Yadio',
  BitcoinduLiban: 'BitcoinduLiban',
  CoinGecko: 'CoinGecko',
});

const RateExtractors = Object.freeze({
  CoinDesk: async ticker => {
    const api = new Frisbee({ baseURI: 'https://api.coindesk.com' });
    console.log("====api-coindesk:: ticker=", ticker);
    const res = await api.get(`/v1/bpi/currentprice/${ticker}.json`);
    if (res.err) throw new Error(`Could not update rate for ${ticker}: ${res.err}`);

    let json;
    try {
      json = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
    } catch (e) {
      throw new Error(`Could not update rate for ${ticker}: ${e.message}`);
    }
    let rate = json?.bpi?.[ticker]?.rate_float; // eslint-disable-line
    if (!rate) throw new Error(`Could not update rate for ${ticker}: data is wrong`);

    rate = Number(rate);
    if (!(rate >= 0)) throw new Error(`Could not update rate for ${ticker}: data is wrong`);
    return rate;
  },
  // Yadio: async ticker => {
  //   const api = new Frisbee({ baseURI: 'https://api.yadio.io/json' });
  //   const res = await api.get(`/${ticker}`);
  //   if (res.err) throw new Error(`Could not update rate for ${ticker}: ${res.err}`);

  //   let json;
  //   try {
  //     json = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
  //   } catch (e) {
  //     throw new Error(`Could not update rate for ${ticker}: ${e.message}`);
  //   }
  //   let rate = json?.[ticker]?.price;
  //   if (!rate) throw new Error(`Could not update rate for ${ticker}: data is wrong`);

  //   rate = Number(rate);
  //   if (!(rate >= 0)) throw new Error(`Could not update rate for ${ticker}: data is wrong`);
  //   return rate;
  // },
  // BitcoinduLiban: async ticker => {
  //   const api = new Frisbee({ baseURI: 'https://bitcoinduliban.org' });
  //   const res = await api.get('/api.php?key=lbpusd');
  //   if (res.err) throw new Error(`Could not update rate for ${ticker}: ${res.err}`);

  //   let json;
  //   try {
  //     json = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
  //   } catch (e) {
  //     throw new Error(`Could not update rate for ${ticker}: ${e.message}`);
  //   }
  //   let rate = json?.[`BTC/${ticker}`];
  //   if (!rate) throw new Error(`Could not update rate for ${ticker}: data is wrong`);

  //   rate = Number(rate);
  //   if (!(rate >= 0)) throw new Error(`Could not update rate for ${ticker}: data is wrong`);
  //   return rate;
  // },
  CoinGecko: async ticker => {
    const api = new Frisbee({ baseURI: 'https://api.coingecko.com' });
    console.log("====api-gecko:: ticker=", ticker);
    const res = await api.get(`/api/v3/simple/price?ids=electra-protocol&vs_currencies=${ticker}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`);
    if (res.err) throw new Error(`Could not update rate for ${ticker}: ${res.err}`);

    let json;
    try {
      json = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
      console.log("===json ::", json);//{"electra-protocol": {"ltc": 0.00000728}}
    } catch (e) {
      throw new Error(`Could not update rate for ${ticker}: ${e.message}`);
    }
    let rate = json?.["electra-protocol"]?.[ticker.toLowerCase()]; // eslint-disable-line
    if (!rate) throw new Error(`Could not update rate for ${ticker}: data is wrong`);

    rate = Number(rate);
    if (!(rate >= 0)) throw new Error(`Could not update rate for ${ticker}: data is wrong`);
    console.log("===rate ::", rate)
    return rate;
  },
});

export const FiatUnit = Object.freeze({
  BTC: { endPointKey: 'BTC', symbol: 'BTC', locale: 'en-US', source: FiatUnitSource.CoinGecko },
  ETH: { endPointKey: 'ETH', symbol: 'ETH', locale: 'en-US', source: FiatUnitSource.CoinGecko },
  LTC: { endPointKey: 'LTC', symbol: 'LTC', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  BCH: { endPointKey: 'BCH', symbol: 'BCH', locale: 'en-US', source: FiatUnitSource.CoinGecko},  
  BNB: { endPointKey: 'BNB', symbol: 'BNB', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  EOS: { endPointKey: 'EOS', symbol: 'EOS', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  XRP: { endPointKey: 'XRP', symbol: 'XRP', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  XLM: { endPointKey: 'XLM', symbol: 'XLM', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  LINK: { endPointKey: 'LINK', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  DOT: { endPointKey: 'DOT', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  YFI: { endPointKey: 'YFI', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  USD: { endPointKey: 'USD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  AED: { endPointKey: 'AED', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  ARS: { endPointKey: 'ARS', symbol: '$', locale: 'es-AR', source: FiatUnitSource.Yadio },
  AUD: { endPointKey: 'AUD', symbol: '$', locale: 'en-AU', source: FiatUnitSource.CoinGecko},
  BDT: { endPointKey: 'BDT', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  BHD: { endPointKey: 'BHD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  BMD: { endPointKey: 'BMD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  BRL: { endPointKey: 'BRL', symbol: 'R$', locale: 'pt-BR', source: FiatUnitSource.CoinGecko},
  CAD: { endPointKey: 'CAD', symbol: '$', locale: 'en-CA', source: FiatUnitSource.CoinGecko},
  CHF: { endPointKey: 'CHF', symbol: 'CHF', locale: 'de-CH', source: FiatUnitSource.CoinGecko},
  CLP: { endPointKey: 'CLP', symbol: '$', locale: 'es-CL', source: FiatUnitSource.CoinGecko},
  CNY: { endPointKey: 'CNY', symbol: '¥', locale: 'zh-CN', source: FiatUnitSource.CoinGecko},
  CZK: { endPointKey: 'CZK', symbol: 'Kč', locale: 'cs-CZ', source: FiatUnitSource.CoinGecko},
  DKK: { endPointKey: 'DKK', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  EUR: { endPointKey: 'EUR', symbol: '€', locale: 'en-IE', source: FiatUnitSource.CoinGecko},
  GBP: { endPointKey: 'GBP', symbol: '£', locale: 'en-GB', source: FiatUnitSource.CoinGecko},
  HKD: { endPointKey: 'HKD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  HUF: { endPointKey: 'HUF', symbol: 'Ft', locale: 'hu-HU', source: FiatUnitSource.CoinGecko},
  IDR: { endPointKey: 'IDR', symbol: '₪', locale: 'he-IL', source: FiatUnitSource.CoinGecko},
  ILS: { endPointKey: 'ILS', symbol: '₪', locale: 'he-IL', source: FiatUnitSource.CoinGecko},
  INR: { endPointKey: 'INR', symbol: '₹', locale: 'hi-HN', source: FiatUnitSource.CoinGecko},  
  JPY: { endPointKey: 'JPY', symbol: '¥', locale: 'ja-JP', source: FiatUnitSource.CoinGecko},
  KRW: { endPointKey: 'KRW', symbol: '₩', locale: 'ko-KR', source: FiatUnitSource.CoinGecko},  
  KWD: { endPointKey: 'KWD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},  
  LKR: { endPointKey: 'LKR', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  MMK: { endPointKey: 'MMK', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  MXN: { endPointKey: 'MXN', symbol: '$', locale: 'es-MX', source: FiatUnitSource.CoinGecko},
  MYR: { endPointKey: 'MYR', symbol: 'RM', locale: 'ms-MY', source: FiatUnitSource.CoinGecko},
  NGN: { endPointKey: 'NGN', symbol: '₦', locale: 'en-NG', source: FiatUnitSource.CoinGecko},
  NOK: { endPointKey: 'NOK', symbol: 'kr', locale: 'nb-NO', source: FiatUnitSource.CoinGecko},
  NZD: { endPointKey: 'NZD', symbol: '$', locale: 'en-NZ', source: FiatUnitSource.CoinGecko},
  PHP: { endPointKey: 'PHP', symbol: '₱', locale: 'en-PH', source: FiatUnitSource.CoinGecko},
  PKR: { endPointKey: 'PKR', symbol: '₱', locale: 'en-PH', source: FiatUnitSource.CoinGecko},
  PLN: { endPointKey: 'PLN', symbol: 'zł', locale: 'pl-PL', source: FiatUnitSource.CoinGecko},
  RUB: { endPointKey: 'RUB', symbol: '₽', locale: 'ru-RU', source: FiatUnitSource.CoinGecko},
  SAR: { endPointKey: 'SAR', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  SEK: { endPointKey: 'SEK', symbol: 'kr', locale: 'sv-SE', source: FiatUnitSource.CoinGecko},
  SGD: { endPointKey: 'SGD', symbol: 'S$', locale: 'zh-SG', source: FiatUnitSource.CoinGecko},
  THB: { endPointKey: 'THB', symbol: '฿', locale: 'th-TH', source: FiatUnitSource.CoinGecko},
  TRY: { endPointKey: 'TRY', symbol: '₺', locale: 'tr-TR', source: FiatUnitSource.CoinGecko},
  TWD: { endPointKey: 'TWD', symbol: 'NT$', locale: 'zh-Hant-TW', source: FiatUnitSource.CoinGecko},
  UAH: { endPointKey: 'UAH', symbol: '₴', locale: 'uk-UA', source: FiatUnitSource.CoinGecko},
  VEF: { endPointKey: 'VEF', symbol: 'Bs.', locale: 'es-VE', source: FiatUnitSource.CoinGecko},
  VND: { endPointKey: 'VND', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  ZAR: { endPointKey: 'ZAR', symbol: 'R', locale: 'en-ZA', source: FiatUnitSource.CoinGecko},
  XDR: { endPointKey: 'XDR', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  XAG: { endPointKey: 'XAG', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  XAU: { endPointKey: 'XAU', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  BITS: { endPointKey: 'BITS', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
  SATS: { endPointKey: 'SATS', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinGecko},
});
export const FiatUnit_1 = Object.freeze({
  USD: { endPointKey: 'USD', symbol: '$', locale: 'en-US', source: FiatUnitSource.CoinDesk },
  ANG: { endPointKey: 'ANG', symbol: 'ƒ', locale: 'en-SX', source: FiatUnitSource.CoinDesk },
  ARS: { endPointKey: 'ARS', symbol: '$', locale: 'es-AR', source: FiatUnitSource.Yadio },
  AUD: { endPointKey: 'AUD', symbol: '$', locale: 'en-AU', source: FiatUnitSource.CoinDesk },
  AWG: { endPointKey: 'AWG', symbol: 'ƒ', locale: 'nl-AW', source: FiatUnitSource.CoinDesk },
  BRL: { endPointKey: 'BRL', symbol: 'R$', locale: 'pt-BR', source: FiatUnitSource.CoinDesk },
  CAD: { endPointKey: 'CAD', symbol: '$', locale: 'en-CA', source: FiatUnitSource.CoinDesk },
  CHF: { endPointKey: 'CHF', symbol: 'CHF', locale: 'de-CH', source: FiatUnitSource.CoinDesk },
  CLP: { endPointKey: 'CLP', symbol: '$', locale: 'es-CL', source: FiatUnitSource.CoinDesk },
  COP: { endPointKey: 'COP', symbol: '$', locale: 'es-CO', source: FiatUnitSource.CoinDesk },
  CZK: { endPointKey: 'CZK', symbol: 'Kč', locale: 'cs-CZ', source: FiatUnitSource.CoinDesk },
  CNY: { endPointKey: 'CNY', symbol: '¥', locale: 'zh-CN', source: FiatUnitSource.CoinDesk },
  EUR: { endPointKey: 'EUR', symbol: '€', locale: 'en-IE', source: FiatUnitSource.CoinDesk },
  GBP: { endPointKey: 'GBP', symbol: '£', locale: 'en-GB', source: FiatUnitSource.CoinDesk },
  HRK: { endPointKey: 'HRK', symbol: 'HRK', locale: 'hr-HR', source: FiatUnitSource.CoinDesk },
  HUF: { endPointKey: 'HUF', symbol: 'Ft', locale: 'hu-HU', source: FiatUnitSource.CoinDesk },
  ILS: { endPointKey: 'ILS', symbol: '₪', locale: 'he-IL', source: FiatUnitSource.CoinDesk },
  INR: { endPointKey: 'INR', symbol: '₹', locale: 'hi-HN', source: FiatUnitSource.CoinDesk },
  JPY: { endPointKey: 'JPY', symbol: '¥', locale: 'ja-JP', source: FiatUnitSource.CoinDesk },
  KES: { endPointKey: 'KES', symbol: 'Ksh', locale: 'en-KE', source: FiatUnitSource.CoinDesk },
  KRW: { endPointKey: 'KRW', symbol: '₩', locale: 'ko-KR', source: FiatUnitSource.CoinDesk },
  LBP: { endPointKey: 'LBP', symbol: 'ل.ل.', locale: 'ar-LB', source: FiatUnitSource.BitcoinduLiban },
  MXN: { endPointKey: 'MXN', symbol: '$', locale: 'es-MX', source: FiatUnitSource.CoinDesk },
  MYR: { endPointKey: 'MYR', symbol: 'RM', locale: 'ms-MY', source: FiatUnitSource.CoinDesk },
  NGN: { endPointKey: 'NGN', symbol: '₦', locale: 'en-NG', source: FiatUnitSource.CoinDesk },
  NOK: { endPointKey: 'NOK', symbol: 'kr', locale: 'nb-NO', source: FiatUnitSource.CoinDesk },
  NZD: { endPointKey: 'NZD', symbol: '$', locale: 'en-NZ', source: FiatUnitSource.CoinDesk },
  PLN: { endPointKey: 'PLN', symbol: 'zł', locale: 'pl-PL', source: FiatUnitSource.CoinDesk },
  PHP: { endPointKey: 'PHP', symbol: '₱', locale: 'en-PH', source: FiatUnitSource.CoinDesk },
  RUB: { endPointKey: 'RUB', symbol: '₽', locale: 'ru-RU', source: FiatUnitSource.CoinDesk },
  SGD: { endPointKey: 'SGD', symbol: 'S$', locale: 'zh-SG', source: FiatUnitSource.CoinDesk },
  SEK: { endPointKey: 'SEK', symbol: 'kr', locale: 'sv-SE', source: FiatUnitSource.CoinDesk },
  TRY: { endPointKey: 'TRY', symbol: '₺', locale: 'tr-TR', source: FiatUnitSource.CoinDesk },
  THB: { endPointKey: 'THB', symbol: '฿', locale: 'th-TH', source: FiatUnitSource.CoinDesk },
  TWD: { endPointKey: 'TWD', symbol: 'NT$', locale: 'zh-Hant-TW', source: FiatUnitSource.CoinDesk },
  TZS: { endPointKey: 'TZS', symbol: 'TSh', locale: 'en-TZ', source: FiatUnitSource.CoinDesk },
  UAH: { endPointKey: 'UAH', symbol: '₴', locale: 'uk-UA', source: FiatUnitSource.CoinDesk },
  UYU: { endPointKey: 'UYU', symbol: '$', locale: 'es-UY', source: FiatUnitSource.CoinDesk },
  VEF: { endPointKey: 'VEF', symbol: 'Bs.', locale: 'es-VE', source: FiatUnitSource.CoinDesk },
  VES: { endPointKey: 'VES', symbol: 'Bs.', locale: 'es-VE', source: FiatUnitSource.Yadio },
  ZAR: { endPointKey: 'ZAR', symbol: 'R', locale: 'en-ZA', source: FiatUnitSource.CoinDesk },
});

export async function getFiatRate(ticker) {
  return await RateExtractors[FiatUnit[ticker].source](ticker);
}
