import React, { useEffect } from 'react'
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { GetAimoveFromOpenRouter } from './utils/aiOpenrouter';
import {CheckWinner} from './utils/winner';

const App = () => {

  // state for 3x3 board (9 cells)
  const [board, setBoard] = React.useState(Array(9).fill(null));

  // state for current player
  const [isPlayerTurn, setIsPlayerTurn] = React.useState(true);

  // Who won? ("x" or "o" or null if no one)
  const [winner, setWinner] = React.useState(null);

  // score tracking
  const [score, setScore] = React.useState({ X: 0, O: 0 });

  // When player clicks a square
  const handleClick = (i) => {

    if (!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];

    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

  }

  useEffect(() => {

    if (winner) return; // prevent double scoring

    // Check for a winner
    const result = CheckWinner(board);
    if (result?.winner) {

      if (result?.winner === "X" || result?.winner === "O") {
      setWinner(result.winner);

        setScore(prevScore => ({
          ...prevScore,
          [result.winner]: prevScore[result.winner] + 1
        }));

      return;
    }

    }
    // AI's turn
    if (!isPlayerTurn && !winner) {

      const aiTurn = async () => {
        const move = await GetAimoveFromOpenRouter(board);
        console.log(move);
      
        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = 'O';
          setBoard(newBoard); 
          setIsPlayerTurn(true);
        }

      };

      const timeoutId = setTimeout(() => {
        aiTurn();
      }, 500); // AI plays after 0.5 seconds

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or re-render

    }


  }, [board, isPlayerTurn, winner]);  

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col space-y-4 items-center justify-center'>
      <h1 className='text-3xl font-bold'>Tic Tac TAI🤖</h1>

      <ScoreBoard score={score} />

      <GameBoard board={board} handleClick={handleClick} />

      {winner && 
        <div className='mt-4 text-xl'>
            
            {winner === "Draw" ? `${winner} it's a draw!` : `${winner} wins!`}
            <button onClick={handleReset} className='ml-4 px-4 py-2 bg-[#38BDF8] text-black rounded hover:bg-[#0EA5E9]'>
               Play Again
            </button>
    
        </div>
      }

    </div>
  )
}

export default App