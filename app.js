const Gameboard = (() =>{
    let gameboard = [...Array(3)].map(e => Array(3)); //ver esta parte e perceber bem
    //https://stackoverflow.com/questions/16512182/how-to-create-empty-2d-array-in-javascript
    const getGameboard = () => gameboard

    return {
        getGameboard
    }
})

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    
    return{
        getName,
        getSymbol
    }
}







const currentGameboard = Gameboard()

