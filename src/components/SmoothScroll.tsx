'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const SmoothScroll = ({ children }: Props) => {
  // console.log('🚀 Lenis SmoothScroll mounted!')

  const LenisComponent = ReactLenis as unknown as React.FC<{
    children: ReactNode
    root?: boolean
    options?: any
  }>

  return (
    <LenisComponent
      root
      options={{
        duration: 2,           // default is 1.2 – increase for smoother feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
        smoothWheel: true,
        smoothTouch: false,      // false is better for mobile stability
      }}
    >
      {children}
    </LenisComponent>
  )
}

export default SmoothScroll
