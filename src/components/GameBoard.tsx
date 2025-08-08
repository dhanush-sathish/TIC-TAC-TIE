import React from 'react'
import Square from './Square'


const GameBoard = ({board, handleClick}) => {

  return (
    <div className='grid grid-cols-3 gap-4 w-[300px] mb-4'>
      {board.map((value, i) => (
        <Square key={i} value={value} onClick={() => handleClick(i)} />
      ))}
    </div>
  )
}

export default GameBoard