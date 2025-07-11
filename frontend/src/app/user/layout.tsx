'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Check if current page is scans page
  const isScansPage = pathname.includes('/scans')

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    //need to add logout logic here
  }

  const handlePrivacyPolicy = () => {
    // need to add HIPAAC and GDPR compliance logic here
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {!isScansPage && (
        <header className="bg-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-[var(--text-primary)] text-xl font-bold">SkinAid</h1>
          
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent text-[var(--text-primary)] hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="material-icons text-xl">settings</span>
            </button>
            
          
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowDropdown(false)}
                ></div>
                
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <button
                    onClick={handlePrivacyPolicy}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
                  >
                    <span className="material-icons text-lg">privacy_tip</span>
                    Privacy Policy
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
                  >
                    <span className="material-icons text-lg">logout</span>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
       
        <div className="mt-4">
            {/* Please make this to dynamic name, using the user/{id} logic. Suramoya */}
          <h2 className="text-[var(--text-primary)] text-xl font-bold leading-tight">Hi, Amelia</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">How can we help today?</p>
        </div>
      </header>
      )}

      <main className={isScansPage ? "" : "px-4 pt-[144px] pb-[80px]"}>
        {children}
      </main>

      {!isScansPage && (
      <footer className="fixed bottom-0 left-0 right-0 z-10">
        <div className="flex gap-2 border-t border-[var(--secondary-color)] bg-white/80 backdrop-blur-sm px-4 pb-3 pt-2">
          <Link 
            href={`/user/${id}`} 
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${pathname === `/user/${id}` ? 'text-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'}`}
          >
            <div className="flex h-8 items-center justify-center">
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal">Home</p>
          </Link>
          
          <Link 
            href={`/user/${id}/scans`} 
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${pathname === `/user/${id}/scans` ? 'text-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'}`}
          >
            <div className="flex h-8 items-center justify-center">
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal">Scans</p>
          </Link>
          
          <Link 
            href={`/user/${id}/profile`} 
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${pathname === `/user/${id}/profile` ? 'text-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'}`}
          >
            <div className="flex h-8 items-center justify-center">
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal">Profile</p>
          </Link>
        </div>
      </footer>
      )}
    </div>
  )
}