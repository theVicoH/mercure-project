import { config } from 'dotenv';
import { IMercure } from '../../types/IMercure';

config();
export class Mercure implements IMercure {
  async publish<T>(topic: string, data: T, jwt: string): Promise<void> {
    const mercureUrl = 'http://mercure:80/.well-known/mercure';

    await fetch(mercureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwt}`,
      },
      body: new URLSearchParams({
        topic: topic,
        data: JSON.stringify(data),
      }),
    });
  }
}
