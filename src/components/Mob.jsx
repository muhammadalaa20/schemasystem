'use client'
import { easeInOut, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BsMenuApp } from 'react-icons/bs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Mob () {
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
        className='text-2xl font-bold text-slate-900 flex items-center justify-center gap-4'
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
      <Sheet>
        <SheetTrigger>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              ease: easeInOut,
              bounce: 0.4
            }}
          >
            <BsMenuApp className='text-xl hover:scale-110 hover:text-primary transition-all duration-300 ease-in-out' />
          </motion.div>
        </SheetTrigger>
        <SheetContent>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              ease: easeInOut,
              bounce: 0.4
            }}
            className='text-xl font-bold text-primary flex items-center justify-start gap-4 mb-5'
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
          <nav className='flex flex-col p-3'>
            <Link
              href='#home'
              className='text-gray-600 hover:text-blue-600 p-3 font-bold'
            >
              Home
            </Link>
            <Link
              href='#about'
              className='text-gray-600 hover:text-blue-600 p-3 font-bold'
            >
              About
            </Link>
            <Link
              href='#services'
              className='text-gray-600 hover:text-blue-600 p-3 font-bold'
            >
              Services
            </Link>
            <Link
              href='#contact'
              className='text-gray-600 hover:text-blue-600 p-3 font-bold'
            >
              Contact
            </Link>
            <div className='h-[1px] w-full bg-gray-200'></div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
