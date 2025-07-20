import HuntPanel from './components/HuntPanel';
import React, { useState } from 'react';

function HuntPanel() {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);

  // Simula a chance de encontrar satoshis na roleta
  const girarRoleta = () => {
    const encontrou = Math.random() < 0.3; // 30% chance de encontrar algo
    if (encontrou) {
      const sats = Math.floor(Math.random() * 1000) + 50; // de 50 a 1050 sats
      setSaldo(saldo + sats);
      setHistorico([{ sats, data: new Date().toLocaleString() }, ...historico]);
    } else {
      alert('Não encontrou nada dessa vez. Tente de novo!');
    }
  };

  return (
    <div style={{ background: '#222', padding: 20, borderRadius: 8, marginTop: 20, color: '#0f0' }}>
      <h2>Painel do Caçador</h2>
      <p><strong>Saldo acumulado:</strong> {saldo} sats</p>
      <button onClick={girarRoleta} style={{ padding: '10px 20px', fontSize: 16 }}>
        Girar Roleta
      </button>

      <h3>Histórico de descobertas:</h3>
      <ul>
        {historico.map((item, i) => (
          <li key={i}>{item.data} — {item.sats} sats</li>
        ))}
        {historico.length === 0 && <li>Sem descobertas ainda.</li>}
      </ul>
    </div>
  );
}

export default HuntPanel;
