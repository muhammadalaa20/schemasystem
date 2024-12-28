'use client'
import { easeInOut, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
export default function Des () {
  return (
    <div className='container mx-auto flex justify-between items-center py-3 px-6'>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: 'spring',
          ease: easeInOut,
          bounce: 0.4
        }}
        className='text-2xl font-bold text-slate-900 flex items-center justify-center gap-2'
      >
        <Image
          src='/logo.svg'
          alt='Alexandria'
          width={500}
          height={500}
          className='rounded-full w-10'
        />{' '}
        <h1>Schema</h1>
      </motion.div>
      <nav className='space-x-4 p-3'>
        <Link
          href='/'
          className='text-gray-600 hover:text-blue-600 p-3 font-bold'
        >
          Home
        </Link>
        <Link
          href='/about'
          className='text-gray-600 hover:text-blue-600 p-3 font-bold'
        >
          About
        </Link>
        <Link
          href='/services'
          className='text-gray-600 hover:text-blue-600 p-3 font-bold'
        >
          Services
        </Link>
        <Link
          href='/contact'
          className='text-gray-600 hover:text-blue-600 p-3 font-bold'
        >
          Contact
        </Link>
      </nav>
    </div>
  )
}
