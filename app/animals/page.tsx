import React from 'react';
import ApolloClientProvider from '../ApolloClientProvider';
import Animals from './Animals';

export default function page() {
  return (
    <ApolloClientProvider initialApolloState={JSON.stringify([])}>
      <Animals />
    </ApolloClientProvider>
  );
}
