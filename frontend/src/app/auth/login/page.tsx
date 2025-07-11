'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function LoginPage() {
  const router = useRouter()

  const mockLogin = () => {
    const email = 'mock@gmail.com'
    const password = 'password'
    const userId = uuidv4()

    console.log(`Email: ${email}, Password: ${password}`)

    // Redirect to user page
    router.push(`/user/${userId}`)
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
              <span className="material-icons text-4xl text-[#3b82f6]">health_and_safety</span>
            </div>
            <h1 className="text-gray-900 text-3xl font-bold leading-tight text-center">
              Welcome Back to SkinAid
            </h1>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                email
              </span>
              <input
                className="form-input w-full rounded-full border border-[#d1d5db] bg-white h-14 pl-12 pr-4 text-gray-900 placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>
              <input
                className="form-input w-full rounded-full border border-[#d1d5db] bg-white h-14 pl-12 pr-4 text-gray-900 placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-full h-14 px-5 bg-[#3b82f6] text-white text-lg font-bold leading-normal tracking-wide hover:opacity-90 transition-opacity"
              onClick={mockLogin}
            >
              <span className="truncate">Login</span>
            </button>
          </div>
          <div className="text-center mt-4">
            <Link
              className="text-[#6b7280] text-sm font-medium hover:text-[#3b82f6] transition-colors"
              href="#"
            >
              Forgot Password?
            </Link>
          </div>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdOv6ZTEU5RGXQAtJwbIkJhQ1-_cWVCFyhbh1-LgcSPNDsQGXg6x7gxmjG08mzeZZkIN85SlDVjy_cxDxCNC4Z7ikD9meA6y9wLCXKLSSNIYjbQ8ifOboGT9kGb76TR4RsMrzhhz4YkfUS8kp6pw_UVzU5gFgAoRyTlj5gBc6DAxfo2dBkAMno22QVOmgHm3Y9i4KoxI-ONFq6A8W8B8R7U_mMdT76iqqrlzWhihaOrUjeWxLSU2PChcbQEmK8HK0eufRIl8vKvw"
              />
              <span className="font-medium">Continue with Google</span>
            </button>
            <button className="flex items-center justify-center w-full bg-black border border-black rounded-full h-14 px-5 text-white hover:bg-gray-800 transition-colors">
              <span className="material-icons mr-3">apple</span>
              <span className="font-medium">Continue with Apple</span>
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-[#6b7280] text-sm">
              Don't have an account?{' '}
              <Link className="font-bold text-[#3b82f6] hover:underline" href="/auth/register">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#6b7280] text-xs font-normal leading-normal text-center">
          By continuing, you agree to our{' '}
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