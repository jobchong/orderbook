import { calculateGlobalMidPrice } from '../src/calculate';
import redisMock from 'redis-mock';
import { promisify } from 'util';

const client = redisMock.createClient();

jest.mock('../src/redis', () => ({
  client: client
}));

describe('calculateGlobalMidPrice', () => {
  it('should calculate the average mid-price correctly', async () => {
    const msetAsync = promisify(client.mSet).bind(client);
    await msetAsync(['binance', '60000', 'kraken', '62000', 'huobi', '61000']);
    
    const globalMidPrice = await calculateGlobalMidPrice();
    expect(globalMidPrice).toBe(61000);
  });
});
