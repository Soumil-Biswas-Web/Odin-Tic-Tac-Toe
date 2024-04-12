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

const Game = (() =>  {
    const constructNewGame = () => {
        const constructNewBoard = () => {
            let board = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];

            return board;
        }

        const player = (name, mark) => {
            return {name, mark}
        };

        let gameArray = constructNewBoard();
        const player1 = player("Player1", "X");
        const player2 = player("Player2", "O");
        
        gameFlow(gameArray, player1, player2);
    }

    const gameFlow = (gameArray, player1, player2) => {
        let players = [player1, player2], winner = null;

        const gameTurn = (currentPlayer, gameArray) => {
            const checkWin = (gameArray) => {
                len = gameArray.length;
        
                const checkRow = (len, currentPlayer) => {
                    for(let i=0; i<len; i++){
                        win = true;
                        for(let j=0; j<len; j++){
                            if (gameArray[i][j] != currentPlayer.mark){
                                //console.log("mark undetected at gameArray[" + i + "][" + j + "]");
                                win = false;
                                continue;
                            }
                            else console.log("mark detected at gameArray[" + i + "][" + j + "]");                            
                        }
        
                        if (win === true) {
                            console.log("match detected at row:" + i);
                            return win;
                        }
                    }
                    return win;
                }
        
                const checkCol = (len, currentPlayer) => {
                    for(let i=0; i<len; i++){
                        win = true;
                        for(let j=0; j<len; j++){
                            if (gameArray[j][i] != currentPlayer.mark){
                                //console.log("mark undetected at gameArray[" + i + "][" + j + "]");
                                win = false;
                                continue;
                            }
                            else console.log("mark detected at gameArray[" + j + "][" + i + "]");                            
                        }
        
                        if (win === true) {
                            console.log("match detected at column:" + i);
                            return win;
                        }
                    }
                    return win;            
                }
                
                const checkDiag = (len, currentPlayer) => {
                    win = true;
                    for(let i=0; i<len; i++){
                        if (gameArray[i][i] != currentPlayer.mark){
                            //console.log("mark undetected at gameArray[" + i + "][" + i + "]");
                            win = false;
                        }
                        else console.log("mark detected at gameArray[" + i + "][" + j + "]");                        
                    }

                    if (win === true) {
                        console.log("match detected at diagonal: 1");
                        return win;
                    }

                    win = true;        
                    for(let i=0; i<len; i++){
                        j = (len - 1) - i;
                        if (gameArray[i][j] != currentPlayer.mark){
                            console.log("mark undetected at gameArray[" + i + "][" + j + "]");
                            win = false;
                        }
                        else console.log("mark detected at gameArray[" + i + "][" + j + "]");                        
                    }

                    if (win === true) {
                        console.log("match detected at diagonal: 2");
                        return win;
                    }
                    return win;            
                }
    
                if(checkRow(len, currentPlayer) || checkCol(len, currentPlayer) || checkDiag(len, currentPlayer)){
                    winner = currentPlayer.name;
                    return winner;
                }
                else return null;      
            }  

            console.log(currentPlayer.name + "'s turn!");
            let turnCoords = prompt("Enter row and column of tile for " + currentPlayer.name + " Mark: " + currentPlayer.mark).split(" ");
            gameArray[turnCoords[0]-1][turnCoords[1]-1] = currentPlayer.mark;   //takes given co-ordinates, and places the player's mark on the tile
            winner = checkWin(gameArray);   
        }      

        while (winner === null){
            for (let i in players) {
                console.log(gameArray);
                let currentPlayer = players[i];
                gameTurn(currentPlayer, gameArray);
                if (winner != null){
                    break;
                }                                    
            }
        }
        console.log(winner + " wins!");        
    }

    return {constructNewGame};
})();

// Driver Code
/*
const newGame = document.querySelector(".new_game");
newGame.addEventListener("click", Game.constructNewGame());
*/

Game.constructNewGame();