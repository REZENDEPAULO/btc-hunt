import React, { useState, useEffect } from 'react';

function HuntPanel() {
  // Estados com valores iniciais vindo do localStorage ou padrão
  const [saldo, setSaldo] = useState(() => Number(localStorage.getItem('saldo')) || 0);
  const [historico, setHistorico] = useState(() => {
    const saved = localStorage.getItem('historico');
    return saved ? JSON.parse(saved) : [];
  });
  const [tentativas, setTentativas] = useState(() => Number(localStorage.getItem('tentativas')) || 0);
  const [bloqueadoAte, setBloqueadoAte] = useState(() => {
    const saved = localStorage.getItem('bloqueadoAte');
    return saved ? new Date(saved) : null;
  });

  // Salvar no localStorage sempre que os dados mudam
  useEffect(() => {
    localStorage.setItem('saldo', saldo);
  }, [saldo]);

  useEffect(() => {
    localStorage.setItem('historico', JSON.stringify(historico));
  }, [historico]);

  useEffect(() => {
    localStorage.setItem('tentativas', tentativas);
  }, [tentativas]);

  useEffect(() => {
    if (bloqueadoAte) {
      localStorage.setItem('bloqueadoAte', bloqueadoAte.toISOString());
    } else {
      localStorage.removeItem('bloqueadoAte');
    }
  }, [bloqueadoAte]);

  // Função que checa se está bloqueado
  const estaBloqueado = () => {
    if (!bloqueadoAte) return false;
    return new Date() < new Date(bloqueadoAte);
  };

  const girarRoleta = () => {
    if (estaBloqueado()) {
      alert(`Você está bloqueado! Tente novamente em alguns minutos.`);
      return;
    }

    const encontrou = Math.random() < 0.3; // 30% chance de achar algo

    if (encontrou) {
      const sats = Math.floor(Math.random() * 1000) + 50;
      setSaldo(saldo + sats);
      setHistorico([{ sats, data: new Date().toLocaleString() }, ...historico]);
      setTentativas(0); // reseta tentativas após ganhar
    } else {
      const novaTentativas = tentativas + 1;
      setTentativas(novaTentativas);
      if (novaTentativas >= 10) {
        const bloqueio = new Date();
        bloqueio.setMinutes(bloqueio.getMinutes() + 10);
        setBloqueadoAte(bloqueio);
        alert(`Você errou 10 vezes. Bloqueado por 10 minutos.`);
        setTentativas(0);
      } else {
        alert('Não encontrou nada dessa vez. Tente de novo!');
      }
    }
  };

  return (
    <div style={{ background: '#222', padding: 20, borderRadius: 8, marginTop: 20, color: '#0f0' }}>
      <h2>Painel do Caçador</h2>
      <p><strong>Saldo acumulado:</strong> {saldo} sats</p>
      <p><strong>Tentativas erradas:</strong> {tentativas}</p>
      {estaBloqueado() && <p style={{color: 'red'}}>Bloqueado até: {new Date(bloqueadoAte).toLocaleTimeString()}</p>}
      <button onClick={girarRoleta} style={{ padding: '10px 20px', fontSize: 16 }} disabled={estaBloqueado()}>
        Girar Roleta
      </button>

      <h3>Histórico de descobertas:</h3>
      <ul style={{ maxHeight: 150, overflowY: 'auto' }}>
        {historico.map((item, i) => (
          <li key={i}>{item.data} — {item.sats} sats</li>
        ))}
        {historico.length === 0 && <li>Sem descobertas ainda.</li>}
      </ul>
    </div>
  );
}

export default HuntPanel;
