import { useEffect, useState } from 'react';

export function useMercure(topic: string) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url = new URL('http://localhost:8080/.well-known/mercure');
    url.searchParams.append('topic', topic);
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
      setData(JSON.parse(event.data));
    };

    eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [topic]);

  return data;
}
