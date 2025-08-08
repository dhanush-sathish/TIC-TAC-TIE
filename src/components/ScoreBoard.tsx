import React from 'react'

const ScoreBoard = ({score}) => {

  return (
    <div className='flex justify-between w-[300px] mb-4 text-lg font-semibold'>

        <div className="font-bold text-[#845EC2]">You (X): {score.X}</div>
        <div className="font-bold text-[#ff6f91]">AI (O): {score.O}</div>


    </div>
  )
}

export default ScoreBoard