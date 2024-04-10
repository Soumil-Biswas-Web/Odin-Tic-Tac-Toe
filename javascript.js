function gameBoard (name) {
    // Makes new Gameboards
    const gameBoard = document.createElement("div");
    gameBoard.setAttribute("id", "game_board");
    for(let i=0; i<9; i++){
        const box = createBox();
        gameBoard.append(box);
    }
    return gameBoard
}

function createBox() {
    const box = document.createElement("div");
    box.setAttribute("class", "box");
    return box;
}

function Game () {
    // Controls flow of game
}

function Players () {
    // Creates new Player Objects
}

function constructNewGame() {
    const gamePanel = document.querySelector(".game_panel");
    const newGameBoard = gameBoard("currentboad");
    gamePanel.appendChild(newGameBoard);
}

// Driver Code

const newGame = document.querySelector(".new_game");
newGame.addEventListener("click", constructNewGame);