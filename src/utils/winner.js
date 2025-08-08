

export const CheckWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // RightDiagonal
    [2, 4, 6], // LeftDiagonal
  ];

// Loop through each winning combination
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;


    // Check for a winner

    // 1. There is something in the square
    // 2. It is the same as the other two in the combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {winner: board[a], combo: []}; // "X" or "O"
    }
  }

  // If no winner but all cells are filled
  if (board.every(square => square !== null)) {
    return {winner: 'Draw', combo: []}; // Draw condition
  }

  // No winner and not all cells are filled, return null (game still ongoing)
  return null;
  
};