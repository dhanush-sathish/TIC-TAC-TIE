import React from 'react'
import {motion} from 'framer-motion'

const Square = ({value, onClick}) => {

  return (
    <motion.button className="w-[90px] h-[90px] flex items-center font-bold text-4xl justify-center bg-[#1E293B] "
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}>
      {value}
    </motion.button>
  )
}

export default Square