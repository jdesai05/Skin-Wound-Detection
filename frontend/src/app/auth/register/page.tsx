'use client'

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="bg-white text-[#111418] min-h-screen" style={{ fontFamily: 'Lexend, sans-serif' }}>
      <div className="container mx-auto px-6 py-8 flex flex-col min-h-screen">
        <header className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#1273f1] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
        </header>
        <main className="flex-grow">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your SkinAid Account</h1>
          <form action="#" className="space-y-6" method="POST">
            <div>
              <label className="sr-only" htmlFor="full-name">Full Name</label>
              <input 
                className="w-full h-14 px-4 py-2 bg-[#f0f2f5] border-transparent rounded-xl focus:ring-2 focus:ring-[#1273f1] focus:border-transparent placeholder:text-[#60728a]" 
                id="full-name" 
                name="full-name" 
                placeholder="Full Name" 
                required 
                type="text"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input 
                className="w-full h-14 px-4 py-2 bg-[#f0f2f5] border-transparent rounded-xl focus:ring-2 focus:ring-[#1273f1] focus:border-transparent placeholder:text-[#60728a]" 
                id="email" 
                name="email" 
                placeholder="Email" 
                required 
                type="email"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input 
                className="w-full h-14 px-4 py-2 bg-[#f0f2f5] border-transparent rounded-xl focus:ring-2 focus:ring-[#1273f1] focus:border-transparent placeholder:text-[#60728a]" 
                id="password" 
                name="password" 
                placeholder="Password" 
                required 
                type="password"
              />
            </div>
            <div>
              <button 
                className="w-full h-14 flex items-center justify-center px-4 py-2 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-[#1273f1] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1273f1]" 
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-sm text-[#60728a]">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-6 space-y-4">
            <button className="w-full h-14 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-base font-medium text-[#111418] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1273f1]">
              <img 
                alt="Google logo" 
                className="h-6 w-6 mr-3" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbByxeZKhtQ9Znf-vrWP6zZMY4lBnd_sbfjZ5D7Ur2MXydUPghCgafTp15D1tIkaVlDuuA2LEhhCjDe2sXIMEMRXIvimemn3EegVdvzIeinGnolwcVlb-JFTBHXx_gR2rcxJ-iz1uzyUAh9wQJh5GzRBU69-idI74VU_7PuQMyiihJ5lmQFE1c-I-eBQwFuK0GMSBjOUQjkad98mi5cf63HSPSmVhxYwMBt_ErNq9jBOo8b569TOKTrbK3tiSD2eImN4fCI3UwRA"
              />
              Sign Up with Google
            </button>
            <button className="w-full h-14 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-base font-medium text-[#111418] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1273f1]">
              <img 
                alt="Apple logo" 
                className="h-6 w-6 mr-3" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAVq6a5m1jjoDzEFbugprnYPciqLwQgr-zS4N2VluUqGNciBXsEh8P4pRLNGhiFZffEQeYVnBB_tIflnquL8AVTOXCEZsyAHb7QvIg1n_LjDj2qYpSbklL-po5LCf25cJ5_u__LYEmLn0ZUW5C2Eh94vusDd5WayT9qIbKn03qTy_IPbGQR5u8GzIxTH5jV-mjgLmYNI-LaW7SSZDUgMSBTSEbOJu-MMH8kK8aA2pOAc9-uQbwecS21AFJx8ltXQioWXL93A_AFA"
              />
              Sign Up with Apple
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#60728a]">
              Already have an account? <Link className="font-medium text-[#1273f1] hover:text-opacity-80" href="/auth/login">Log In</Link>
            </p>
          </div>
        </main>
        <footer className="mt-auto pt-8 pb-4 text-center">
          <p className="text-xs text-[#60728a]">
            By signing up, you agree to our <Link className="underline" href="#">Terms & Conditions</Link> and <Link className="underline" href="#">Privacy Policy</Link>.
          </p>
        </footer>
      </div>
    </div>
  )
}