import React from 'react';
import VirtualizedTransactionFeed from './components/VirtualizedTransactionFeed';

const App: React.FC = () => (
  <main style={{ background: '#f4f7fb', minHeight: '100vh', padding: '32px 24px' }}>
    <div style={{ margin: '0 auto', maxWidth: 1180 }}>
      <VirtualizedTransactionFeed />
    </div>
  </main>
);

export default App;
