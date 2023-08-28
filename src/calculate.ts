import client from './redis';

export const calculateGlobalMidPrice = async(): Promise<number> => {
  const res = await client.mGet(['binance', 'kraken', 'huobi'])
  const prices = res.map(Number);
  const avg = prices.reduce((acc, val) => acc + val, 0) / prices.length;
  return avg
};
