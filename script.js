const choices = document.querySelectorAll('.choice');
const resultMessage = document.getElementById('result-message');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');

let playerScore = 0;
let computerScore = 0;

const outcomes = {
    pedra: { tesoura: 'quebra', lagarto: 'esmaga' },
    papel: { pedra: 'cobre', spock: 'refuta' },
    tesoura: { papel: 'corta', lagarto: 'decapita' },
    lagarto: { spock: 'envenena', papel: 'come' },
    spock: { tesoura: 'destrói', pedra: 'vaporiza' }
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        displayResult(playerChoice, computerChoice, winner);
        updateScore(winner);
    });
});

function getComputerChoice() {
    const choices = ['pedra', 'papel', 'tesoura', 'lagarto', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    } else if (outcomes[player][computer]) {
        return 'player';
    } else {
        return 'computer';
    }
}
 
function displayResult(player, computer, winner) {
    const playerImg = document.getElementById('player-choice-img');
    const computerImg = document.getElementById('computer-choice-img');

    // Define imagens
    playerImg.src = `img/img${player}.png`;
    playerImg.alt = player;
    playerImg.style.display = 'inline';

    computerImg.src = `img/img${computer}.png`;
    computerImg.alt = computer;
    computerImg.style.display = 'inline';

    // Reset animações
    playerImg.className = '';
    computerImg.className = '';

    // Toca som e aplica animação
    if (winner === 'draw') {
        resultMessage.textContent = `Empate! Ambos escolheram ${capitalize(player)}`;
        document.getElementById('sound-draw').play();
        playerImg.classList.add('pulse');
        computerImg.classList.add('pulse');
    } else if (winner === 'player') {
        resultMessage.textContent = `Você ganhou! ${capitalize(player)} ${outcomes[player][computer]} ${computer}`;
        document.getElementById('sound-win').play();
        playerImg.classList.add('win');
        computerImg.classList.add('lose');
    } else {
        resultMessage.textContent = `Você perdeu! ${capitalize(computer)} ${outcomes[computer][player]} ${player}`;
        document.getElementById('sound-lose').play();
        playerImg.classList.add('lose');
        computerImg.classList.add('win');
    }
}

function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const manualBtn = document.getElementById('how-to-play-btn');
const modal = document.getElementById('manual-modal');
const closeBtn = document.querySelector('.close-btn');

manualBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha se clicar fora da modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
