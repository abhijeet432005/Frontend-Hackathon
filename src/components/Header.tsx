import React from 'react'
import { FizzLogo } from '@/components/FizzLogo'


export default function Header() {
  return <header className='-mb-28 flex justify-center py-4'>
    <FizzLogo className='z-10 h-20 cursor-pointer text-sky-800' />
  </header>
}