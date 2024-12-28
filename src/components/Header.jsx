'use client'
import Des from './Des'
import Mob from './Mob'
import { useEffect } from 'react'

export default function Header () {
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        document.getElementById('header')?.classList.add('bg-opacity-95')
        document.getElementById('desNav')?.classList.add('scale-95')
        document.getElementById('mobNav')?.classList.add('scale-95')
      } else {
        document.getElementById('header')?.classList.remove('bg-opacity-95')
        document.getElementById('desNav')?.classList.remove('scale-95')
        document.getElementById('mobNav')?.classList.remove('scale-95')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })
  return (
    <header
      className=' w-full sticky top-0 bg-slate-900 bg-opacity-90 z-40'
      id='header'
    >
      <div
        className='hidden lg:block xl:block transition-all duration-300 ease-in-out'
        id='desNav'
      >
        <Des />
      </div>
      <div
        className='block lg:hidden xl:hidden transition-all duration-300 ease-in-out'
        id='mobNav'
      >
        <Mob />
      </div>
    </header>
  )
}
