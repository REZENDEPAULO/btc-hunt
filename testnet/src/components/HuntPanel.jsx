import React, { useState, useEffect } from 'react';

const desafios = [
  {
    pergunta: 'O que é cheio de buracos, mas ainda assim consegue reter água?',
    resposta: 'esponja',
  },
  {
    pergunta: 'Se você me tem, quer compartilhar; se você compartilha, não me tem. O que sou?',
    resposta: 'segredo',
  },
  {
    pergunta: 'Quanto mais você tira, maior eu fico. O que sou?',
    resposta: 'buraco',
  },
  {
    pergunta: 'O que pode viajar pelo mundo enquanto fica no mesmo lugar?',
    resposta: 'selo',
  },
  {
    pergunta: 'O que sobe e nunca desce?',
    resposta: 'idade',
  },
];

function HuntPanel() {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [mostraDesafio, setMostraDesafio] = useState(false);
  const [desafioAtual, setDesafioAtual] = useState(null);
  const [respostaUser, setRespostaUser] = useState('');
  const [bloqueado, setBloqueado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);

  useEffect(() => {
    let timer;
    if (bloqueado && tempoRestante > 0) {
      timer = setInterval(() => {
        setTempoRestante((t) => {
          if (t <= 1) {
            setBloqueado(false);
            setTentativas(0);
            setMostraDesafio(false);
            clearInterval(timer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [bloqueado, tempoRestante]);

  const girarRoleta = () => {
    if (bloqueado) return;

    // Se já atingiu 10 tentativas, mostrar desafio
    if (tentativas === 10) {
      escolherDesafio();
      setMostraDesafio(true);
      return;
    }

    setTentativas(tentativas + 1);

    const encontrou = Math.random() < 0.3; // 30% chance de encontrar algo
    if (encontrou) {
      const sats = Math.floor(Math.random() * 1000) + 50; // de 50 a 1050 sats
      setSaldo(saldo + sats);
      setHistorico([{ sats, data: new Date().toLocaleString() }, ...historico]);
    } else {
      alert('Não encontrou nada dessa vez. Tente de novo!');
    }
  };

  const escolherDesafio = () => {
    const index = Math.floor(Math.random() * desafios.length);
    setDesafioAtual(desafios[index]);
    setRespostaUser('');
  };

  const verificarResposta = () => {
    if (!desafioAtual) return;
    if (respostaUser.trim().toLowerCase() === desafioAtual.resposta.toLowerCase()) {
      alert('Resposta correta! Você pode continuar jogando.');
      setMostraDesafio(false);
      setTentativas(0);
    } else {
      alert('Resposta errada! Você ficará bloqueado por 10 minutos.');
      setBloqueado(true);
      setTempoRestante(600); // 600 segundos = 10 minutos
      setMostraDesafio(false);
    }
  };

  return (
    <div style={{ background: '#222', padding: 20, borderRadius: 8, marginTop: 20, color: '#0f0' }}>
      <h2>Painel do Caçador</h2>
      <p><strong>Saldo acumulado:</strong> {saldo} sats</p>
      {!bloqueado && !mostraDesafio && (
        <button onClick={girarRoleta} style={{ padding: '10px 20px', fontSize: 16 }}>
          Girar Roleta
        </button>
      )}

      {mostraDesafio && desafioAtual && (
        <div style={{ marginTop: 20 }}>
          <h3>Desafio! Responda para continuar jogando:</h3>
          <p>{desafioAtual.pergunta}</p>
          <input
            type="text"
            value={respostaUser}
            onChange={(e) => setRespostaUser(e.target.value)}
            style={{ padding: 8, width: '100%', borderRadius: 4, fontSize: 16 }}
          />
          <button onClick={verificarResposta} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
            Enviar Resposta
          </button>
        </div>
      )}

      {bloqueado && (
        <div style={{ marginTop: 20, color: 'red' }}>
          <p>Você errou o desafio e está bloqueado por 10 minutos.</p>
          <p>Tempo restante: {Math.floor(tempoRestante / 60)}m {tempoRestante % 60}s</p>
        </div>
      )}

      <h3>Histórico de descobertas:</h3>
      <ul>
        {historico.length === 0 && <li>Sem descobertas ainda.</li>}
        {historico.map((item, i) => (
          <li key={i}>{item.data} — {item.sats} sats</li>
        ))}
      </ul>
    </div>
  );
}

export default HuntPanel;
