function gameBoard (name) {
    // Makes new Gameboards
    const gameArray = new Array(9); // Array of squares in game board
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
    setBoxProperties(box);
    return box;
}

function setBoxProperties(box) {
    box.addEventListener("click", putMark);
}

function gameFlow () {
    // Controls flow of game
    let currentPlayer;
    if (player1.mark === "X") currentPlayer = player1;
    else currentPlayer = player2;
    updateBanner;
    playerTurn;
}

function playerTurn() {

}

function createPlayer (name, mark) {
    // Creates new Player Objects
    const playerProfile = document.createElement("img");
    if (mark === "O") {
        playerProfile.setAttribute("src", "Images/LightVerse130xWhite.webp");
    }
    else if (mark === "X") {
        playerProfile.setAttribute("src", "Images/DarkVerse130xWhite.webp");
    }
    return playerProfile;
}

function constructNewGame() {
    const gamePanel = document.querySelector(".game_panel");
    const banner = document.createElement("div");
    banner.setAttribute("id", "banner");
    gamePanel.appendChild(banner);
    const player1 = createPlayer("Player1", "X");
    gamePanel.appendChild(player1);
    const newGameBoard = gameBoard("currentboad");
    gamePanel.appendChild(newGameBoard);
    const player2 = createPlayer("Player2", "O");
    gamePanel.appendChild(player2);

    gameFlow;
}

const Game = (function() {
    const constructNewGame = () => {
        let gameArray = new Array(9);
        const player1 = player("Player1", "X");
        const player2 = player("Player2", "O");

        gameFlow(gameArray, player1, player2);
    }
    
    const player = (name, mark) => {
        return {name, mark}
    };

    const gameFlow = (gameArray, player1, player2) => {
        let currentPlayer = player1;
        console.log(currentPlayer.name + "'s turn!");
    }

    return {constructNewGame, player};
})();

// Driver Code
/*
const newGame = document.querySelector(".new_game");
newGame.addEventListener("click", Game.constructNewGame());
*/

Game.constructNewGame();