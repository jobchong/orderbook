import request from 'supertest';
import express from 'express';
import { calculateGlobalMidPrice } from '../src/calculate';

const app = express();

jest.mock('../src/calculate');

app.get('/btcusdt', async (req, res) => {
  const globalMidPrice = await calculateGlobalMidPrice();
  res.json({ globalMidPrice });
});

describe('GET /btcusdt', () => {
  it('should return the global mid-price', async () => {
    const mockedCalc = jest.mocked(calculateGlobalMidPrice)
    mockedCalc.mockResolvedValue(61000);

    const response = await request(app).get('/btcusdt');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ globalMidPrice: 61000 });
  });
});
