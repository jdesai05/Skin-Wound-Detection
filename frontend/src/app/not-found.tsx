import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between group/design-root bg-[#F8FAFC]" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
      <header className="p-6 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-[#1993e5]">
            dermatology
          </span>
          <h1 className="text-[#111518] text-2xl font-bold leading-tight tracking-tighter">
            SkinAid
          </h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center px-6 text-center">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <span className="material-symbols-outlined text-8xl text-slate-300">
                error_outline
              </span>
            </div>
            <h2 className="text-6xl font-bold text-slate-800 tracking-tight mb-4">
              404
            </h2>
            <h3 className="text-2xl font-bold text-slate-700 tracking-tight mb-4">
              Page Not Found
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
            </p>
          </div>
        </div>
      </main>

      <footer className="p-6">
        <Link href="/" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[#1993e5] text-white text-lg font-bold leading-normal tracking-wide shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors duration-300">
          <span className="material-symbols-outlined mr-2">
            home
          </span>
          <span className="truncate">Go Home</span>
        </Link>
        <nav className="mt-6 flex justify-center gap-x-6">
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