'use client'

import { useEffect, useState } from 'react'
import { gsap, Expo } from 'gsap'

const Loader = ({ children }) => {
  const [counter, setCounter] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const radius = 26
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    gsap.from('.fizz-text span', {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transformOrigin: 'bottom',
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
  }, [])

  useEffect(() => {
    const count = setInterval(() => {
      setCounter(prev =>
        prev < 100
          ? prev + 1
          : (clearInterval(count), setCounter(100), triggerReveal())
      )
    }, 25)

    return () => clearInterval(count)
  }, [])

  const triggerReveal = () => {
    const tl = gsap.timeline()

    tl.to('.loader-hide', { opacity: 0, duration: 0.3 })
      .to('.loader-hide', { display: 'none', duration: 0.1 })
      .fromTo(
        '.follow-bar',
        { width: '0%' },
        {
          width: '100%',
          ease: Expo.easeInOut,
          duration: 1.2,
        }
      )
      .to('.fizz-text', {
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeOut,
      }, '-=0.3')
      .to('.follow-bar', {
        height: '100%',
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.2,
      })
      .to('.loader-wrapper', {
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeOut,
        onComplete: () => {
          setTimeout(() => {
            setIsLoaded(true)
          }, 100)
        },
      })
  }

  if (isLoaded) return children

  return (
    <div className="loader-wrapper fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-500">

      {/* Yellow Follow Bar */}
      <div className="follow-bar absolute top-1/2 left-0 h-[2px] bg-yellow-300 -translate-y-1/2 z-10 w-0" />

      {/* White Progress Bar */}
      <div
        className="loader-hide absolute top-1/2 left-0 h-[2px] bg-white -translate-y-1/2 z-20"
        style={{ width: `${counter}%` }}
      />

      {/* FIZZ Text */}
      <h1 className="fizz-text text-[10vw] sm:text-[8vw] md:text-[6vw] font-bold text-white z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[0.3vw]">
        {['F', 'I', 'Z', 'Z'].map((char, idx) => (
          <span key={idx} className="inline-block">{char}</span>
        ))}
      </h1>

      {/* Bottom Right Circular Progress with % */}
      <div className="loader-hide absolute bottom-4 right-5 sm:bottom-6 sm:right-8 z-30 w-14 h-14">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="#facc15"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - counter / 100)}
            className="transition-all duration-75 ease-linear"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <p className="text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] text-white">
            {counter}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loader
