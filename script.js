function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = Array.from({ length: rows }, () => Array(columns).fill(" "));

  const getBoard = () => board;

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

  return { getBoard, dropToken, checkWin, printBoard };
}

function GameController(playerOneName = "Amino", playerTwoName = "Mohammed") {
  const board = Gameboard();

  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, column) => {
    console.log(`Placing ${activePlayer.name}'s token into ${row},${column}...`);

    if (!board.dropToken(row, column, activePlayer.token)) {
      console.log("Invalid move, try again!");
      return;
    }

    board.printBoard();

    if (board.checkWin(activePlayer.token)) {
      console.log(`${activePlayer.name} wins! 🎉`);
      return;
    }

    switchPlayerTurn();
    console.log(`It's now ${activePlayer.name}'s turn.`);
  };

  console.log(`Game starts! ${activePlayer.name}'s turn.`);
  board.printBoard();

  return { playRound };
}

const game = GameController();
game.playRound(1,1)