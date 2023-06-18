// Variables with Selectors (by id)
const gameboard = document.querySelector('#gameboard');
const infodisp = document.querySelector('#info');
const cells = [
    "", "", "", "", "", "", "", "", ""
];

let turn = 'circle';

function createBoard() {
    cells.forEach((cell, index) => {
        const cellele = document.createElement('div');
        cellele.classList.add('square'); // Adding a Square Class.
        cellele.id = index; // Assigning index as id for each square.
        gameboard.append(cellele);
        cellele.addEventListener('click', addInp);
    });
}

function addInp(e) {
    const display = document.createElement('div');
    display.classList.add(turn);
    e.target.append(display);
    turn = turn === 'circle' ? "cross" : "circle";
    infodisp.textContent = "Now " + turn + "'s Turn !";
    e.target.removeEventListener("click", addInp);
    checkScore(); 
}

function checkScore() {
    const allsquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let isDraw = true;

    winningCombos.forEach(array => {
        const isCircleWin = array.every(cell => allsquares[cell].firstChild?.classList.contains('circle'));
        const isCrossWin = array.every(cell => allsquares[cell].firstChild?.classList.contains('cross'));
        if (isCircleWin || isCrossWin) {
            
            const winner = isCircleWin ? 'circle' : 'cross';
            infodisp.textContent = "Game Over! " + winner + " wins!";
            allsquares.forEach(square => square.removeEventListener('click', addInp));
        }
    });

    if(isDraw){
        const isAllFilled = Array.from(allsquares).every(square => square.firstChild != null);
        if (isAllFilled) {
            infodisp.textContent = "It's a Draw ! Game will Restart in 5 seconds";
            allsquares.forEach(square => square.removeEventListener("click",addInp))
            setInterval(location.reload(),10000);
        }
    }
}

createBoard();
