const Game = (() =>  {
    const constructNewGame = () => {
        const constructNewBoard = () => {
            const gameBoard = (name) => {
                const createBox = (i) => {
                    // Creates boxes inside the grid
                    const box = document.createElement("div");
                    box.setAttribute("class", "box");
                    box.setAttribute("id", String(i));
                    //setBoxProperties(box);
                    return box;
                }
                
                const setBoxProperties = (box, currentPlayer) => {
                    // Handles button logic for boxes

                    const setMark = (mark) => {
                        let boxImage = box.querySelector("img");
                        if (boxImage != null){
                            boxImage.remove();
                        }

                        boxImage = document.createElement("img");
                        boxImage.setAttribute("class", "verse");
                        box.appendChild(boxImage);

                        if (mark === "O") {
                            boxImage.setAttribute("src", "Images/LightVerse130xWhite.webp");
                        }
                        else if (mark === "X") {
                            boxImage.setAttribute("src", "Images/DarkVerse130xWhite.webp");
                        }
                        boxImage.setAttribute("style", "filter: invert(1); width: 100%");
                    }

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
                                else console.log("mark detected at gameArray[" + i + "][" + i + "]");                        
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
                    
                    box.addEventListener("click", () => {
                        let coords = Number(box.id);
                        board.gameArray[Number(coords%3)][Math.ceil(coords/3)] = currentPlayer.mark;
                        console.log(board);
                        winner = checkWin(gameArray);
                        if (winner != null) {
                            deactivateBoard();
                            console.log(winner + " wins!"); 
                        }
                        else {
                            currentPlayer = (currentPlayer === player1) ? player2 : player1;
                            activateBoard(currentPlayer, board);
                        }
                    });

                    return {setMark};
                }

                // Makes new Gameboards
                const gameBoard = document.createElement("div");
                gameBoard.setAttribute("id", "game_board");
                for(let i=0; i<9; i++){
                    const box = createBox(i);
                    gameBoard.append(box);
                }
                return {gameBoard, name, setBoxProperties};
            }            

            let gameArray = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];  // Array of squares in game board

            // Creates a pnael with the Board and two players in it
            const gamePanel = document.querySelector(".game_panel");
            gamePanel.setAttribute("style", "display: flex");

            const banner = document.createElement("div");
            banner.setAttribute("id", "banner");
            gamePanel.appendChild(banner);
            gamePanel.appendChild(player1.playerProfile);
            const newGameBoard = gameBoard("currentboad");
            gamePanel.appendChild(newGameBoard.gameBoard);
            gamePanel.appendChild(player2.playerProfile);

            return {gameArray, newGameBoard};
        }

        const activateBoard = (currentPlayer, board) => {
            const boxes = document.querySelectorAll(".box");
            boxes.forEach(function(box) {
                const boxProperties = board.newGameBoard.setBoxProperties(box, currentPlayer);
                boxProperties.setMark(currentPlayer.mark);
            });
        }

        const player = (name, mark) => {
            const playerProfile = document.createElement("img");
            if (mark === "O") {
                playerProfile.setAttribute("src", "Images/LightVerseModx256.webp");
            }
            else if (mark === "X") {
                playerProfile.setAttribute("src", "Images/DarkVerseModx256.webp");
            }
            return {name, mark, playerProfile};            
        };

        const player1 = player("Player1", "X");
        const player2 = player("Player2", "O");
        let board = constructNewBoard();
        winner = null;

        let currentPlayer = player1;
        console.log(currentPlayer.name + "'s turn!");
        activateBoard(currentPlayer, board);   
    }

    return {constructNewGame};
})();

// Driver Code

const newGame = document.querySelector(".new_game");
newGame.addEventListener("click", Game.constructNewGame);