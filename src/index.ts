import express from 'express';
import { calculateGlobalMidPrice } from './calculate';
import { fetchBinanceOrderBook } from './exchanges/binance';
import { fetchKrakenOrderBook } from './exchanges/kraken';
import './exchanges/huobi';

const app = express();
const port = 3000;

// Fetch order books periodically
setInterval(fetchBinanceOrderBook, 10000);
setInterval(fetchKrakenOrderBook, 10000);

app.get('/btcusdt', async (req, res) => {
  const globalMidPrice = await calculateGlobalMidPrice();
  res.json({ globalMidPrice });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
