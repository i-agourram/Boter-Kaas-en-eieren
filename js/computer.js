const winningCombos = [ //manieren om te winnen
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];



const grid = () => Array.from(document.querySelectorAll(".q")); //maakt een array van alle vakjes en zorgt ervoor dat je erop kan klikken
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));  //zorgt ervoor dat er een X or O komt 
const emptyQs = () => grid().filter(_qEl => _qEl.innerText === ''); //zorgt ervoor dat alles leeg is
const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== ''); 

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]); //zorgt ervoor dat de computer een random plekje kiest.

const endGame = (winningSequence) => { 
    winningSequence.forEach(_qEl => _qEl.classList.add('winner'));
    disableListeners(); //Zorgt ervoor dat je niet meer kan klikken als je gewonnen hebt.
};
const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(_c => {
        const _grid = grid(); //de "_" zorgt ervoor dat de computer ook iets invult
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });
    return victory;
};

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => { //Zorgt ervoor dat je 1 seconde moet wachten voordat er iets gedaan wordt.
        takeTurn(opponentChoice(), 'o');
        if(!checkForVictory())
            enableListeners();
    }, 1000);
}

const clickFn = ($event) => {
    takeTurn(qNumId($event.target), 'x');
    if(!checkForVictory())
        opponentTurn();
};

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn)); 

enableListeners();


