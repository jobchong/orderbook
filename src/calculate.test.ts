import { calculateGlobalMidPrice } from './calculate';
import client from './redis';
import { jest } from '@jest/globals'

jest.mock('./redis');

describe('calculateGlobalMidPrice', () => {
  it('should calculate average correctly', async () => {
    (client.mGet as jest.Mock).mockResolvedValue(['100', '200', '300']);
    const result = await calculateGlobalMidPrice();
    expect(result).toBe(200);
  });

  it('should handle Redis failure', async () => {
    (client.mGet as jest.Mock).mockRejectedValue(new Error('Redis Error'));
    await expect(calculateGlobalMidPrice()).rejects.toThrow('Redis Error');
  });
});
