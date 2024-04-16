

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MessageFeed from './src/components/messageFeed';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MessageFeed />
    </QueryClientProvider>
  );
};

export default App;
