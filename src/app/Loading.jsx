'use client'

import { motion } from 'framer-motion'

export default function Loading () {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-white'>
      <motion.div
        className='w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
      ></motion.div>
    </div>
  )
}
