import React from 'react';
import ReactDOM from 'react-dom/client';
import VirtualizedFeed from './components/VirtualizedFeed';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Enterprise Transactions</h1>
      <VirtualizedFeed />
    </main>
  </React.StrictMode>
);
