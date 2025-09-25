'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Use this data definition
interface DiagnosisData {
  diagnosis: {
    condition: string,
    disclaimer: string,
    first_aid:string,
    remedy:string
  } 
}

export default function DiagnosisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null)

  //store the image in LocalStorage or send it to database for persistence, --suramya
  useEffect(() => {
    const imageParam = searchParams.get('image')
    if (imageParam) {
      setCapturedImage(decodeURIComponent(imageParam))
    } else {
      const savedImage = localStorage.getItem('scanImage')
      if (savedImage) {
        setCapturedImage(savedImage)
        localStorage.removeItem('scanImage')
      }
    }

    const diagnosisData:DiagnosisData = {
      diagnosis:{
        ...JSON.parse(localStorage.getItem('diagnosisResult')!)
      }
    }
    console.log(diagnosisData)
    setDiagnosisData(diagnosisData as DiagnosisData)
  }, [searchParams])

  if (!diagnosisData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gray-50" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <button 
            onClick={() => router.back()}
            className="text-gray-900 size-10 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Diagnosis
          </h1>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-24">
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="p-1 px-3 bg-white/20 backdrop-blur-md rounded-full inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
            </div>
            {capturedImage ? (
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" 
                   style={{ backgroundImage: `url("${capturedImage}")` }}>
              </div>
            ) : (
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
              {diagnosisData.diagnosis.condition}
            </h2>
          </div>
        </section>

        <section>
          <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
            Treatment Suggestions
          </h2>
          
          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2">
            First Aid
          </h3>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2">
            <div className="flex items-stretch px-4 gap-4">
              <p>
                {diagnosisData.diagnosis.first_aid}
              </p>
            </div>
          </div>

          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Home Remedies
          </h3>
          <div className="space-y-2 px-4">
            <p>
              {diagnosisData.diagnosis.remedy}
            </p>
          </div>
          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">
            Disclaimer
          </h3>
          <div className="space-y-2 px-4">
            {
              diagnosisData.diagnosis.disclaimer
            }
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 pt-2">
        <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[#1993e5] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
          <span className="truncate">Consult an Expert</span>
        </button>
      </footer>
    </div>
  )
}
