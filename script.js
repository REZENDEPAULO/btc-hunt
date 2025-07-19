const map = document.getElementById('map');
const status = document.getElementById('status');

let attempts = 0;
let sats = 0;
let hiddenIndex = Math.floor(Math.random() * 6); // posição da chave

const positions = [
  { top: '10%', left: '20%' },
  { top: '30%', left: '70%' },
  { top: '50%', left: '40%' },
  { top: '70%', left: '60%' },
  { top: '20%', left: '80%' },
  { top: '60%', left: '20%' }
];

function createKeys() {
  positions.forEach((pos, i) => {
    const keyDiv = document.createElement('div');
    keyDiv.className = 'key';
    keyDiv.style.top = pos.top;
    keyDiv.style.left = pos.left;
    keyDiv.addEventListener('click', () => handleClick(i));
    map.appendChild(keyDiv);
  });
}

function handleClick(i) {
  attempts++;
  if (i === hiddenIndex) {
    sats += 100;
    alert('🎉 Achou a chave! +100 sats');
    resetGame();
  } else {
    alert('Tente de novo!');
    if (attempts % 10 === 0) {
      const resposta = prompt('🔍 Desafio de lógica: O que sobe mas nunca desce?');
      if (resposta && resposta.toLowerCase().includes('idade')) {
        sats += 50;
        alert('Resposta certa! +50 sats');
      } else {
        alert('Errado! 🧠');
      }
    }
  }
  status.textContent = `Tentativas: ${attempts} | Satoshis: ${sats}`;
}

function resetGame() {
  hiddenIndex = Math.floor(Math.random() * 6);
  map.innerHTML = '';
  createKeys();
}

createKeys();
