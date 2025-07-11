export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-3xl text-[#1993e5] animate-pulse">
            dermatology
          </span>
          <h1 className="text-[#111518] text-2xl font-bold leading-tight tracking-tighter">
            SkinAid
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-[#1993e5] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#1993e5] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-[#1993e5] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        <p className="text-slate-600 mt-4">Loading...</p>
      </div>
    </div>
  )
}