/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SignUpRequest, signup } from '@/apis/auth'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignUp = async () => {
    try {
      const req: SignUpRequest = {
        name: name!,
        email: email!,
        password: password!,
      }

      const res = await signup(req)
      if(res.name){
        router.push('/user') // Redirect to login after successful signup
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#F9FAFB] group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
              <img
                src="/SkinnAidLogo.png"
                alt="SkinnAid Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-gray-900 text-3xl font-bold leading-tight text-center">
              Create Your SkinnAid Account
            </h1>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                person
              </span>
              <label className="sr-only" htmlFor="full-name">Full Name</label>
              <input
                onChange={(e) => { setName(e.target.value) }}
                className="form-input w-full rounded-full border border-[#d1d5db] bg-white h-14 pl-12 pr-4 text-gray-900 placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                id="full-name"
                name="full-name"
                placeholder="Full Name"
                required
                type="text"
              />
            </div>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                email
              </span>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                onChange={(e) => { setEmail(e.target.value) }}
                className="form-input w-full rounded-full border border-[#d1d5db] bg-white h-14 pl-12 pr-4 text-gray-900 placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                id="email"
                name="email"
                placeholder="Email"
                required
                type="email"
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                onChange={(e) => { setPassword(e.target.value) }}
                className="w-full h-14 px-4 py-2 bg-[#f0f2f5] border-transparent rounded-xl focus:ring-2 focus:ring-[#1273f1] focus:border-transparent placeholder:text-[#60728a] pr-12" 
                id="password" 
                name="password" 
                placeholder="Password" 
                required 
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#60728a] focus:outline-none"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.158 5.447m-2.505-2.505L19 19"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2">
              <button
                className="flex w-full cursor-pointer items-center justify-center rounded-full h-14 px-5 bg-[#3b82f6] text-white text-lg font-bold leading-normal tracking-wide hover:opacity-90 transition-opacity"
                type="submit"
              >
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </form>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-[#6b7280] text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex flex-col space-y-4">
            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-full h-14 px-5 text-gray-700 hover:bg-gray-50 transition-colors">
              <img
                alt="Google icon"
                className="w-6 h-6 mr-3"
                src="https://developers.google.com/identity/images/g-logo.png"
              />
              <span className="font-medium">Sign Up with Google</span>
            </button>
            <button className="flex items-center justify-center w-full bg-black border border-black rounded-full h-14 px-5 text-white hover:bg-gray-800 transition-colors">
              <span className="material-icons mr-3">apple</span>
              <span className="font-medium">Sign Up with Apple</span>
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-[#6b7280] text-sm">
              Already have an account?{' '}
              <Link className="font-bold text-[#3b82f6] hover:underline" href="/auth/login">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#6b7280] text-xs font-normal leading-normal text-center">
          By signing up, you agree to our{' '}
          <Link className="underline" href="#">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link className="underline" href="#">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
