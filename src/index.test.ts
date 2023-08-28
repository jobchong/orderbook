import request from 'supertest';
import { app } from './index';
import { calculateGlobalMidPrice } from './calculate';

jest.mock('./calculate');

describe('GET /btcusdt', () => {
  it('should return calculated globalMidPrice', async () => {
    (calculateGlobalMidPrice as jest.Mock).mockResolvedValue(200);
    const res = await request(app).get('/btcusdt');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ globalMidPrice: 200 });
  });
});
