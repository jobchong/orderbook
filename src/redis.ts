import { createClient } from 'redis';
import { redisConfig } from './config';

const client = createClient(redisConfig);

client.on('connect', () => console.log('Connected to Redis'));
client.on('error', err => console.log('Redis Client Error', err));

await client.connect()

export default client
