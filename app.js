const gameBoard = (() =>{
    let gameboard = [...Array(3)].map(e => Array(3)); //ver esta parte e perceber bem
    //https://stackoverflow.com/questions/16512182/how-to-create-empty-2d-array-in-javascript
    const newBoard = () => gameboard = [...Array(3)].map(e => Array(3))
    const getGameBoard = () => gameboard;
    const changeBoard = (row,col,symbol) =>{
        gameboard[row][col] = symbol
        console.table(getGameBoard())
    }
    const printBoard = () => console.table(gameboard)
    let COMBINATIONS =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const checkWin = (gameboard) =>{
        let condition = false
        board = [...gameboard[0],...gameboard[1],...gameboard[2]]
        COMBINATIONS.forEach(comb =>{
            if (board[comb[0]] && board[comb[1]] && board[comb[2]]){
               
                let v1 = board[comb[0]]
                let v2 = board[comb[1]]
                let v3 = board[comb[2]]
                if((v1 == v2) && (v2 == v3)){
                    condition = true
                }
            }})
        if (condition){
            return true
        }
        return false
    }

    const allFilled = (gameboard) =>{
        board = [...gameboard[0],...gameboard[1],...gameboard[2]]
        for (let i = 0; i < 9;i++){
            console.log(i)
            if (board[i] == undefined){
                return false
            }
        }
        return true
    }

    return {
        getGameBoard,
        changeBoard,
        printBoard,
        checkWin,
        newBoard,
        allFilled
    };
})();


const Player = (name) => {
    const getName = () => name;
    return{
        getName
    }
}

const displayController = (() =>{
    const loadBoard = () =>{
        let div = document.createDocumentFragment();
        let gameGrid = document.createElement("div");
        gameGrid.className = "gameGrid";
        for (let i = 1; i < 10; i++){
            square = document.createElement("div");
            square.className = `x square s${i} open`;
            gameGrid.appendChild(square);
        }
        div.appendChild(gameGrid);
        let body = document.querySelector(".body");
        body.appendChild(div);
    };
    const play = (p1,p2) =>{
        squares = document.querySelectorAll(".open")
        squares.forEach(square =>{
            square.addEventListener("click", () =>{
                var index = parseInt(square.className.charAt(10))
                console.log(index)
                console.log(square.className)
                if(square.className.charAt(0) == "x"){
                    symbol = "❌"
                    square.className = "x"+square.className.slice(1,-4) + "closed"
                    square.textContent = symbol
                    if(index < 4){
                        gameBoard.changeBoard(0,index-1,symbol)
                    }else if(index < 7){
                        gameBoard.changeBoard(1,index-4,symbol)
                    }else{
                        gameBoard.changeBoard(2,index-7,symbol)
                    }
                    changeClass("o")
                    if (gameBoard.checkWin(gameBoard.getGameBoard())){
                        closeClass()
                        showWinner(symbol)
                    }else if (gameBoard.allFilled(gameBoard.getGameBoard())){
                        showTie()
                    }
                }else{
                    symbol = "⭕"
                    square.className = "o"+square.className.slice(1,-4) + "closed"
                    square.textContent = symbol
                    if(index < 4){
                        gameBoard.changeBoard(0,index-1,symbol)
                    }else if(index < 7){
                        gameBoard.changeBoard(1,index-4,symbol)
                    }else{
                        gameBoard.changeBoard(2,index-7,symbol)
                    }
                    changeClass("x")
                    if (gameBoard.checkWin(gameBoard.getGameBoard())){
                        closeClass()
                        showWinner(symbol)
                    }else if (gameBoard.allFilled(gameBoard.getGameBoard())){
                        showTie()
                    }
                }
            },{once: true})
        })
        
    }

    const showTie = () =>{
        document.getElementById("winner_div").style.display = "block";
        document.getElementById("winner").textContent = `Its a Tie -.-`
        document.getElementById("restart").addEventListener("click", ()=>{
            displayController.restart()
        })
    }

    const changeClass = (mark) =>{
        squares = document.querySelectorAll(".square")
        squares.forEach(square =>{
            square.className = mark + square.className.slice(1,square.className.length )
        })
    };

    const closeClass = () =>{
        squares = document.querySelectorAll(".open")
        squares.forEach(square =>{
            square.className = square.className.slice(0,square.className.length-4) + "closed"
            square.replaceWith(square.cloneNode(true));
        })
    }

    const showWinner = (player) => {
        document.getElementById("winner_div").style.display = "block";
        document.getElementById("winner").textContent = `Player ${player} Wins!`
        document.getElementById("restart").addEventListener("click", ()=>{
            displayController.restart()
        })}

    const clearGrid = () => {
        document.querySelector(".gameGrid").remove()
        loadBoard()
        gameBoard.newBoard()
        play(p1,p2)
    }

    const restart = () =>{
        clearGrid()
        document.getElementById("winner_div").style.display = "none"
    }
    const startGame = () =>{
        p1 = Player("Rodrigo")
        p2 = Player("Joana")
        loadBoard()
        play(p1,p2)
    }
    return{
        startGame,
        restart
    }
})()




displayController.startGame()
