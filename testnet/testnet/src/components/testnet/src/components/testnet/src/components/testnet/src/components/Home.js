import React from 'react';
import Receive from './Receive';
import Balance from './Balance';
import Send from './Send';

const Home = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>BTC Hunt - Testnet</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <Receive />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <Balance />
      </section>

      <section>
        <Send />
      </section>
    </div>
  );
};

export default Home;
