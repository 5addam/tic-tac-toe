const Player = (name, mark) => {
    const getName = name;
    const getMark = mark;
    return{getName, getMark};
};

const Gameboard = (function(){
    let gameboard = [...Array(10).keys()];
    let board = "";
    
    function displayBoard(){
        console.log("Game Board");
        for(let i=1;i<=gameboard.length;i++){
            if(i === 4 || i ===7){
                console.log('-+-+-')
            }
            if(i%3 === 0){
                board = board + gameboard[i];
                console.log(board.trim());
                board = "";
            }
            else{
                board = board + gameboard[i] + "|";
            }

            }
           
        }

    return {displayBoard};
}
)();

let game = Gameboard;
game.displayBoard();