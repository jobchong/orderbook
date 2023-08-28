import axios from 'axios';
import client from '../redis';

export const fetchBinanceOrderBook = async () => {
  const response = await axios.get('https://api.binance.com/api/v3/depth', {
    params: { symbol: 'BTCUSDT', limit: 5 }
  });

  const { asks, bids } = response.data;
  const midPrice = (parseFloat(asks[0][0]) + parseFloat(bids[0][0])) / 2;

  client.set('binance', midPrice.toString());
};
