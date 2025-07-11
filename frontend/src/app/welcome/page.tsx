'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [elementsVisible, setElementsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setElementsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative flex size-full min-h-screen flex-col justify-between bg-[#F8FAFC] group/design-root transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`} style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
      
      {/* Clean Header */}
      <header className={`p-6 text-center transition-all duration-700 delay-100 ${
        elementsVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <div className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-[#1993e5]">
            dermatology
          </span>
          <h1 className="text-[#111518] text-2xl font-bold leading-tight tracking-tighter">
            SkinAid
          </h1>
        </div>
      </header>

      {/* Clean Main Content */}
      <main className="flex-grow flex flex-col justify-center px-6 text-center">
        <div className="flex-grow flex items-center justify-center">
          {/* Fixed image container */}
          <div className={`transition-all duration-1000 delay-300 ${
            elementsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="w-full max-w-sm mx-auto">
              <img 
                src="/skinnaid-hero.jpg"
                alt="Medical professional examining patient's skin"
                className="w-full h-auto aspect-square object-cover rounded-2xl shadow-lg"
            
              />
            </div>
          </div>
        </div>
        
        {/* Clean text content */}
        <div className={`mt-8 mb-4 transition-all duration-1000 delay-500 ${
          elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Welcome to SkinAid
          </h2>
          <p className="text-slate-600 text-lg mt-2 leading-relaxed">
            Real-time AI Dermatology for Everyone.
          </p>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="p-6">
        {/* Clean Get Started Button */}
        <div className={`transition-all duration-1000 delay-900 ${
          elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Link href="/auth/login" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[#1993e5] text-white text-lg font-bold leading-normal tracking-wide shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors duration-300">
            <span className="truncate">Get Started</span>
            <span className="material-symbols-outlined ml-2">
              arrow_forward
            </span>
          </Link>
        </div>
        
        {/* Clean Navigation */}
        <nav className={`mt-6 flex justify-center gap-x-6 transition-all duration-1000 delay-1000 ${
          elementsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Link href="#" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Terms
          </Link>
          <Link href="#" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}