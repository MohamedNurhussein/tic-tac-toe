//iniliaze scores
let score1 = 0
let score2 = 0
//
var isWon = false
function closePopup() {
  const popup = document.getElementById('winPopup');
  popup.style.display = 'none';
}

console.log(score1)
console.log(score2)
document.addEventListener('DOMContentLoaded', (event) => {
  
  function Gameboard() {
      const rows = 3;
      const columns = 3;
      const board = Array.from({ length: rows }, () => Array(columns).fill(" "));

      const getBoard = () => board;
      const getValue =(row,column)=>{
        return board[row][column];
      }
      const dropToken = (row, column, player) => {
          // check if cell is available
          if (board[row][column] !== " ") return false; 
          board[row][column] = player;
          return true;
      };

      const checkWin = (player) => {
          // Check rows and columns
          for (let i = 0; i < rows; i++) {
              if (board[i].every(cell => cell === player)) return true; // Row win
              if (board.every(row => row[i] === player)) return true;   // Column win
          }

          // Check diagonals
          if ([0, 1, 2].every(i => board[i][i] === player)) return true; // Top-left to bottom-right
          if ([0, 1, 2].every(i => board[i][2 - i] === player)) return true; // Top-right to bottom-left

          return false;
      };

      const printBoard = () => {
          board.forEach(row => console.log(row.join(" | ")));
          console.log();
      };

      return { getBoard,getValue, dropToken, checkWin, printBoard };
  }

  function GameController(playerOneName = "Player 1", playerTwoName = "Player 2") {
      const board = Gameboard();

      const players = [
          { name: playerOneName, token: "X" },
          { name: playerTwoName, token: "O" }
      ];

      let activePlayer = players[0];

      const switchPlayerTurn = () => {
          activePlayer = activePlayer === players[0] ? players[1] : players[0];
      };

      const getActivePlayer=()=>activePlayer.token;

      function playerWins(name) {
        const popup = document.getElementById('winPopup');
        addScoreAndUpdate(name)
        document.getElementById('congrats').innerHTML =name+ " won the game! 🎉";
        popup.style.display = 'block';
      }
      function addScoreAndUpdate(name){
        //check which player won
          if (name == playerOneName)
              score1++
          else
              score2++
          //update score
          document.getElementById('score1').innerHTML = score1;
          document.getElementById('score2').innerHTML = score2;
        
      }

      const playRound = (row, column) => {
        //show board in console
        board.printBoard();
          if (!board.dropToken(row, column, activePlayer.token)) {
              console.log("Invalid move, try again!");
              return board.getValue(row,column);
          }
          //get active player
          const active= activePlayer.token;

          //check if player wins
          if (board.checkWin(activePlayer.token) && !isWon) {
              console.log(`${activePlayer.name} wins! 🎉`);
              playerWins(activePlayer.name)
              isWon=true
              return active;
          }
          
          switchPlayerTurn();
          console.log(`It's now ${activePlayer.token}'s turn.`);
          return active;
      };

      console.log(`Game starts! ${activePlayer.token}'s turn.`);
      board.printBoard();

      return { playRound, getActivePlayer };
  }

  const game = GameController();
  
  document.querySelectorAll('.cell').forEach(button => {
    button.addEventListener('click', function() {
        //get button's id
        const buttonId = this.id;
        //play your turn
        token=""
        if (buttonId == 1)
          token=game.playRound(0,0);
        else if (buttonId == 2)
          token=game.playRound(0,1);
        else if (buttonId == 3)
          token=game.playRound(0,2);
        else if (buttonId == 4)
          token=game.playRound(1,0);
        else if (buttonId == 5)
          token=game.playRound(1,1);
        else if (buttonId == 6)
          token=game.playRound(1,2);
        else if (buttonId == 7)
          token=game.playRound(2,0);
        else if (buttonId == 8)
          token=game.playRound(2,1);
        else if (buttonId == 9)
          token=game.playRound(2,2);
        //place the mark
        document.getElementById(buttonId).innerHTML = token;

    });
});

});
// 1  2  3     0,0  0.1  0,2
// 4  5  6     0,1  1,1  1,2
// 7  8  9     0,2  1,2  2,2


        //invaild move--done
        //show when player wins---done
        //implement score--done

        //fix error score--done
        //restart game, and reset isWon to false
        //change name