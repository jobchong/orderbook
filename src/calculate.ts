import client from './redis';

export const calculateGlobalMidPrice = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.mGet(['binance', 'kraken', 'huobi']).then(res => {

      const prices = res.map(Number);
      const avg = prices.reduce((acc, val) => acc + val, 0) / prices.length;

      resolve(avg);
    });
  });
};
