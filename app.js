const createPlayer = (name, mark) => {
    return {name, mark};
} 

const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    function _printBoard() {
        var e = document.querySelector("#board");
        
        /*clear old board*/
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
        
        /*display new board*/
        for (let i = 0; i < 9; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add(`${i.toString()}`);
            square.setAttribute('id', `${i.toString()}`)
            square.textContent = board[i];
            square.addEventListener("click", (e)  => {
                game.addMark(e.target, e.target.id);
            })
            document.getElementById("board").appendChild(square);          
        }        
    }

    function updateBoard() {
        _printBoard();
        document.getElementById("start").remove();
    }

    return {
        updateBoard: updateBoard,
    };
    
}) ();

const game =(() => {
    const Player1 = createPlayer("Player 1", "X");
    const Player2 = createPlayer("Player 2", "O");

    /*Set initial conditions*/
    let remainingTurns = 9;
    winner = 0;
    let turn = Player1;
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    /*Handle player move*/
    function addMark(element, elementId) {
        if (remainingTurns == 0) {
            document.getElementById("turn").textContent = "Tie game!";
        }
        if (winner == 1) {
            alert("This game is already finished!")
        }
        /*check if space has already been clicked*/
        if (element.textContent == "" && winner != 1) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 3; j++) {
                    if (winningCombos[i][j] == elementId) {
                        winningCombos[i][j] = turn.mark;
                    }
                }
            }

            
            element.textContent = turn.mark;

            /*check for winner*/
            for (let i = 0; i < 8; i++) {

                if (winningCombos[i].every(function(element, index) { return element === turn.mark})) {
                    document.getElementById("turn").textContent = `${turn.name} wins!`;
                    winner = 1;
                    return;
                }
            }
            
            /*swap turns*/
            if (turn == Player1) {
                turn = Player2;
            } else {
                turn = Player1;
            }
        
            remainingTurns--;

        
         } else { /*User chose an already selected space*/
            if (winner != 1) {
                alert("Choose a free space!")
                }
         }

        document.getElementById("turn").textContent = `${turn.name} make a move!`;
        
        /*check if full board*/

        if (remainingTurns == 0 && winner == 0) {
            document.getElementById("turn").textContent = "Tie game!";
            }
        }

        return {
            Player1: Player1,
            Player2: Player2,
            addMark: addMark,
            winningCombos: winningCombos
    }
}) ();

