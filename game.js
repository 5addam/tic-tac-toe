const grid_item = document.querySelectorAll('#grid-item');
const form = document.getElementsByTagName('form')[0];
const btn_restart = document.getElementById('btn-restart');
const btn_start = document.getElementById('btn-start');
const player1_score = document.getElementById('p1-score');
const player2_score = document.getElementById('p2-score');
let playerOne;
let playerTwo;
let playerTurn;

const Player = (name, mark) => {
    const getName = ()=> name;
    const getMark = ()=> mark;
    const placeMark = (e) =>{
        if(Gameboard.gameboard[e.target.dataset.item] === ''){
            Gameboard.gameboard[e.target.dataset.item] = mark;
            DisplayController.renderGameboard();
            console.log(playerTurn.getName());
            return true;
        }
        else{
            return false;
        }
    }
    return{getName, getMark, placeMark};
};


const Gameboard = (function(){
    let gameboard = [...Array(9).fill('')];
    return{gameboard};
}
)();


const DisplayController = (function(){
    const renderGameboard = () =>{
        for(let i=0;i<Gameboard.gameboard.length;i++){
        grid_item[i].textContent = Gameboard.gameboard[i];
    }
    }
    return{renderGameboard};
}
)();

const Game = (function(){
    const _init = () =>{
        Gameboard.gameboard;
        DisplayController.renderGameboard();
        const Player1 = Player(playerOne, 'X');
        const Player2 = Player(playerTwo, 'O');
        playerTurn = Player1;

        grid_item.forEach(element => {
            element.addEventListener('click', (e)=>{
                if(playerTurn.placeMark(e)){
                    ResultCheck.result();
                    setTimeout(()=>(playerTurn === Player2 ? playerTurn = Player1 : playerTurn = Player2), 100);
                }
            });
        });
    }
    const Play = () =>{
        _init();
    }

    return {Play};
})();


const ResultCheck = (function(){
    const result = () =>{
        const board = Gameboard.gameboard;

        if(
            (board[0] === board[1] && board[1] === board[2] && board[2] === 'X') ||
            (board[3] === board[4] && board[4] === board[5] && board[5] === 'X') ||
            (board[6] === board[7] && board[7] === board[8] && board[8] === 'X') ||
            (board[0] === board[3] && board[3] === board[6] && board[6] === 'X') ||
            (board[1] === board[4] && board[4] === board[7] && board[7] === 'X') ||
            (board[2] === board[5] && board[5] === board[8] && board[8] === 'X') ||
            (board[0] === board[4] && board[4] === board[8] && board[8] === 'X') ||
            (board[2] === board[4] && board[4] === board[6] && board[6] === 'X')
            ){
                setTimeout(()=>alert(playerTurn.getName() + ' WON!!'), 100);
                grid_item.forEach(element => {element.style.pointerEvents = 'none';});
                player1_score.textContent = `${Number(player1_score.textContent) + 1}`;
            }
        else if(
                (board[0] === board[1] && board[1] === board[2] && board[2] === 'O') ||
                (board[3] === board[4] && board[4] === board[5] && board[5] === 'O') ||
                (board[6] === board[7] && board[7] === board[8] && board[8] === 'O') ||
                (board[1] === board[4] && board[4] === board[7] && board[7] === 'O') ||
                (board[0] === board[3] && board[3] === board[6] && board[6] === 'O') ||
                (board[2] === board[5] && board[5] === board[8] && board[8] === 'O') ||
                (board[0] === board[4] && board[4] === board[8] && board[8] === 'O') ||
                (board[2] === board[4] && board[4] === board[6] && board[6] === 'O')
                ){
                    setTimeout(()=>alert(playerTurn.getName() + ' WON!!'), 100);
                    grid_item.forEach(element => {element.style.pointerEvents = 'none';});
                    player2_score.textContent = `${Number(player2_score.textContent) + 1}`;
                }
            else if(board.filter(item => item !== '').length === 9) { 
                    setTimeout(()=> alert("TIE!!"),100);
                }
    }
    return {result};

})();

form.addEventListener('submit', (e)=>{
    btn_start.setAttribute('style','box-shadow: 0px 5px 5px var(--secondary-color); transform: translateY(4px); background-color: var(--primary-color); color: var(--white);');
    playerOne = document.getElementById('player1').value;
    playerTwo = document.getElementById('player2').value;
    grid_item.forEach(element => {element.style.pointerEvents = 'auto';});
    Game.Play();
})

const gameRestart = (function(){
    let restart = ()=>{
        Gameboard.gameboard = [...Array(9).fill('')];
        DisplayController.renderGameboard();
        // grid_item.forEach(element => {element.style.pointerEvents = 'none';});
    }
    return{restart};

})();

btn_restart.addEventListener('click', ()=>{
    btn_start.setAttribute('style','box-shadow: 0px 9px 5px var(--secondary-color); transform: translateY(0px); background-color: var(--white); color: black);');
    gameRestart.restart();
});