const blocks = document.querySelectorAll('.block');
const displayWinner = document.querySelector('h2');
var gameBoard = {
    wincombo: [[blocks[0],blocks[1],blocks[2]],[blocks[3],blocks[4],blocks[5]],[blocks[6],blocks[7],blocks[8]],[blocks[0],blocks[3],blocks[6]],[blocks[1],blocks[4],blocks[7]],[blocks[2],blocks[5],blocks[8]],[blocks[0],blocks[4],blocks[8]],[blocks[2],blocks[4],blocks[6]]],
    player1: {
        figure: '',
        score: 0,
        moves: [],

    },
    player2: {
        figure: '',
        score: 0,
        moves: [],
    },
    winner:'',
    roundNumber:0,
    
}
blocks.forEach(x => x.addEventListener('click',function(e){
    newRound();
    turn(e.target);
    tie();
    checkScore();
    whoWon();
    whoisX();
}));

//Player1 or Player2 turn
function turn(x){
    var both = gameBoard.player1.moves.concat(gameBoard.player2.moves);
    var el = Array.from(x.parentNode.children).indexOf(x);
    if(both.length % 2 === 0){
         if(gameBoard.player1.moves.includes(el) || (gameBoard.player2.moves.includes(el))){

        }
        else{
            gameBoard.player1.moves.push(el);
            x.textContent = 'X';
    }return}
if(both.length % 2 === 1){
    if(gameBoard.player2.moves.includes(el) || gameBoard.player1.moves.includes(el)){ 
    }
        else{
        x.textContent = 'O'
        gameBoard.player2.moves.push(el);
     }
     return;
    }}
// Which figure is a winner
function checkScore(){
    for(var i =0;i < 8;i++){
        for(var j=0;j<gameBoard.wincombo[i].length;j++){
            if(gameBoard.wincombo[i][0].textContent == 'X' && gameBoard.wincombo[i][1].textContent == 'X' && gameBoard.wincombo[i][2].textContent == 'X'){
                gameBoard.winner = 'X';
            }
            if(gameBoard.wincombo[i][0].textContent == 'O' && gameBoard.wincombo[i][1].textContent == 'O' && gameBoard.wincombo[i][2].textContent == 'O'){
                gameBoard.winner = 'O';   
            }
        }
    }
    }
// player won
function whoWon(){
    if((gameBoard.player1.figure == 'X' && gameBoard.winner == 'X') ||(gameBoard.player1.figure == 'O' && gameBoard.winner == 'O')){
        gameBoard.player1.score++;
        win();
        displayWinner.innerHTML = `Player 1 wins, SCORE ${gameBoard.player1.score} : ${gameBoard.player2.score}`
    }
    if((gameBoard.player2.figure === 'O' && gameBoard.winner === 'O')||(gameBoard.player2.figure === 'X' && gameBoard.winner === 'X')){
        gameBoard.player2.score++;
        win()
        displayWinner.innerHTML = `Player 2 wins, SCORE ${gameBoard.player1.score} : ${gameBoard.player2.score}`

    }
}
//
function whoisX(){
    if(gameBoard.roundNumber % 2 == 0){
        gameBoard.player1.figure = 'X';
        gameBoard.player2.figure = 'O';
    }
    if(gameBoard.roundNumber % 2 == 1){
        gameBoard.player1.figure = 'O';
        gameBoard.player2.figure = 'X';
    }
}
//New round
function newRound(){
    if((displayWinner.classList.contains('wins')) || (displayWinner.classList.contains('yellow'))){
        displayWinner.classList.remove('wins','yellow');
        displayWinner.innerHTML = `Score ${gameBoard.player1.score} : ${gameBoard.player2.score}`
        gameBoard.player1.moves = [];
        gameBoard.player2.moves = [];
        blocks.forEach(block => block.textContent = '')

    }
}
//resetting score and display
function reset(){
    displayWinner.className ='';
    displayWinner.innerHTML = `SCORE ${gameBoard.player1.score} : ${gameBoard.player2.score}`
    blocks.forEach(block => block.textContent = '');
    gameBoard.player2.moves = [];
    gameBoard.player1.moves = [];
    gameBoard.winner = '';
    gameBoard.roundNumber = 0;

}

//if tie
function tie(){
    var both = gameBoard.player1.moves.concat(gameBoard.player2.moves);
    if(both.length === 9){
        blocks.forEach(block => block.textContent = '');
        displayWinner.innerHTML = `Tie. Score ${gameBoard.player1.score} : ${gameBoard.player2.score}`
        displayWinner.className = '';
        displayWinner.classList.add('yellow')
        gameBoard.player2.moves = [];
        gameBoard.player1.moves = [];
        gameBoard.roundNumber++;
        gameBoard.winner = '';
    }
}
//if win
function win(){
    displayWinner.className = '';
    displayWinner.classList.add('wins');
    gameBoard.player2.moves = [];
    gameBoard.player1.moves = [];
    gameBoard.roundNumber++;
    gameBoard.winner = '';
    
}