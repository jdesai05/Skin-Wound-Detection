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
      console.error(error)
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
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                onChange={(e) => { setPassword(e.target.value) }}
                className="form-input w-full rounded-full border border-[#d1d5db] bg-white h-14 pl-12 pr-4 text-gray-900 placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
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
