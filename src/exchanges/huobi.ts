import WebSocket from 'ws';
import client from '../redis';
import { unzipSync } from 'node:zlib';

const ws = new WebSocket('wss://api.huobi.pro/ws');

ws.on('open', async () => {
  ws.send(JSON.stringify({
    sub: 'market.btcusdt.depth.step0',
    id: 'id1'
  }));
});

ws.on('message', (data) => {
  try {
    const unzipped = unzipSync(data as Buffer)
    const parsed = JSON.parse(unzipped.toString());
    if (parsed.ping) {
      ws.send(JSON.stringify({ pong: parsed.ping }));
    } else if (parsed.tick) {
      const asks = parsed.tick.asks;
      const bids = parsed.tick.bids;
      const midPrice = (asks[0][0] + bids[0][0]) / 2;
      client.set('huobi', midPrice.toString());
    }
  } catch (e) {
    console.log(e)
  }
});
