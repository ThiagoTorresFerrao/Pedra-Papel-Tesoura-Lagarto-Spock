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
    if (winner === 'draw') {
        resultMessage.textContent = `Empate! Ambos escolheram ${player}`;
    } else if (winner === 'player') {
        resultMessage.textContent = `Você ganhou! ${capitalize(player)} ${outcomes[player][computer]} ${computer}`;
    } else {
        resultMessage.textContent = `Você perdeu! ${capitalize(computer)} ${outcomes[computer][player]} ${player}`;
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


// Thiago Torres