import axios from 'axios';
import client from '../redis';

export const fetchKrakenOrderBook = async () => {
  const response = await axios.get('https://api.kraken.com/0/public/Depth', {
    params: { pair: 'XBTUSDT', count: 5 }
  });

  const { asks, bids } = response.data.result.XBTUSDT;
  const midPrice = (parseFloat(asks[0][0]) + parseFloat(bids[0][0])) / 2;

  client.set('kraken', midPrice.toString());
};
