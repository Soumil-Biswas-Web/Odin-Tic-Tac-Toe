const Game = (() =>  {
    const constructNewGame = () => {
        const constructNewBoard = () => {
            const gameBoard = (name) => {
                const createBox = (i) => {
                    // Creates boxes inside the grid
                    const box = document.createElement("div");
                    box.setAttribute("class", "box");
                    box.setAttribute("id", String(i));
                    setBoxProperties(box);
                    return box;
                }
                
                const setBoxProperties = (box) => {
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
                        boxImage.setAttribute("style", "filter: invert(1); height: 100%");
                    }

                    //Checks win conditions
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
                                    //console.log("mark undetected at gameArray[" + i + "][" + j + "]");
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
                    
                    box.addEventListener("click", turn = () => {
                        setMark(currentPlayer.mark); // sets the mark in the visible Game grid
                        let boxNumber = Number(box.id); // find Which box was marked
                        let coords = [Math.floor(boxNumber/3), Math.ceil(boxNumber%3)];   // Conver box Number to X and Y coordinates
                        // insert mark in Gmae Array
                        board.gameArray[coords[0]][coords[1]] = currentPlayer.mark;     // Put correct mark in Game Array
                        console.log(board.gameArray);
                        winner = checkWin(gameArray);
                        // Handle next turn or End of Game
                        console.log(winner)
                        if (winner != null) {
                            box.removeEventListener("click", turn);
                            console.log(winner + " wins!"); 
                            // Show winning text
                            const body = document.querySelector("body");
                            const winnerDiv = document.createElement("div");
                            winnerDiv.setAttribute("class", "winnerText")
                            const wintext = document.createTextNode(winner + " wins!");
                            winnerDiv.appendChild(wintext);
                            body.appendChild(winnerDiv);
                        }
                        else {
                            currentPlayer = (currentPlayer === player1) ? player2 : player1;
                            showBanner(currentPlayer, board.banner);
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
            let gamePanel = document.querySelector(".game_panel");
            if (gamePanel) {
                body.removeChild(gamePanel);
            }
            gamePanel = document.createElement("div");
            gamePanel.setAttribute('class', 'game_panel');
            gamePanel.setAttribute("style", "display: flex");

            gamePanel.appendChild(player1.playerProfile);
            const newGameBoard = gameBoard("currentboad");
            gamePanel.appendChild(newGameBoard.gameBoard);
            gamePanel.appendChild(player2.playerProfile);
            body.appendChild(gamePanel);

            return {gameArray, newGameBoard, banner};
        }

        // Set player images on both sides
        const player = (name, mark) => {
            const playerProfile = document.createElement("img");
            if (mark === "O") {
                playerProfile.setAttribute("src", "Images/LightVerseModx256.webp");
            }
            else if (mark === "X") {
                playerProfile.setAttribute("src", "Images/DarkVerseModx256.webp");
            }
            playerProfile.setAttribute("id", name);
            return {name, mark, playerProfile};            
        };

        // Show who's turn it currently is
        const showBanner = (currentPlayer, banner) => {
            console.log(currentPlayer.name + "'s turn!"); 
            if (banner.innerHTML != null) banner.innerHTML = '';
            let bannerText = document.createTextNode(currentPlayer.name + "'s turn!");
            banner.appendChild(bannerText);

            if (currentPlayer.name === "Player1") {
                document.querySelector("#Player1").style.filter = "drop-shadow(0 0 0.75rem aqua)";
                document.querySelector("#Player2").style.filter = "";
            }
            else {
                document.querySelector("#Player1").style.filter = "";
                document.querySelector("#Player2").style.filter = "drop-shadow(0 0 0.75rem aqua)";
            }
        }
        
        const banner = document.querySelector("#banner");
        const player1 = player("Player1", "X");
        const player2 = player("Player2", "O");
        winner = null;
        
        let currentPlayer = player1;  
        let board = constructNewBoard();
        showBanner(currentPlayer, board.banner);
    }

    return {constructNewGame};
})();

// Driver Code

const body = document.querySelector("body");

const newGame = document.querySelector(".new_game");
newGame.addEventListener("click", Game.constructNewGame);

