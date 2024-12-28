'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function RootLayout ({ children }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleStop)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleStop)
    }
  }, [])

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/logo.svg' />
        <title>Schema Systems</title>
      </head>
      <body className='bg-gray-50'>
        <AnimatePresence mode='wait' initial={false}>
          {isLoading ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 flex items-center justify-center bg-white'
            >
              <div className='spinner'></div> {/* Replace with your spinner */}
            </motion.div>
          ) : (
            <motion.div
              key={Math.random()}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Header />
              {children}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  )
}
