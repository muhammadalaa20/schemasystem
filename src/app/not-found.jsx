// src/app/not-found.jsx
'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NotFound () {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-gray-100'>
      <motion.h1
        className='text-4xl md:text-6xl font-bold text-purple-600'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        404
      </motion.h1>
      <motion.p
        className='text-lg md:text-xl text-gray-600 mt-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.button
        className='mt-6 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition'
        onClick={() => router.push('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back Home
      </motion.button>
    </div>
  )
}
