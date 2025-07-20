import React from 'react';
import HuntPanel from './HuntPanel';

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: 20, backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>💰 BTC Hunt - Caça ao Malote</h1>
      <p>Encontre satoshis escondidos! A cada 10 erros, um desafio mental ou pausa 😎</p>
      <HuntPanel />
    </div>
  );
}

export default App;
