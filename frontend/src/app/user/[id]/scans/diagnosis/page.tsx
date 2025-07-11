'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import mockDiagnosisData from './mock-diagnosis.json'

// Use this data definition
interface DiagnosisData {
  diagnosis: {
    id: string
    timestamp: string
    status: string
    confidence: number
    condition: {
      name: string
      category: string
      severity: string
      description: string
    }
    treatments: {
      over_the_counter: Array<{
        id: string
        name: string
        description: string
        category: string
        active_ingredient: string
        usage: string
        image_url: string
        price_range: string
        availability: string
      }>
      home_remedies: Array<{
        id: string
        title: string
        description: string
        icon: string
        instructions: string[]
        effectiveness: string
        safety_level: string
      }>
    }
    warning_signs: {
      seek_immediate_care: Array<{
        symptom: string
        urgency: string
        description: string
      }>
      seek_medical_consultation: Array<{
        symptom: string
        urgency: string
        description: string
      }>
    }
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

    setDiagnosisData(mockDiagnosisData as DiagnosisData)
  }, [searchParams])

  if (!diagnosisData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getIconSvg = (iconType: string) => {
    switch (iconType) {
      case 'cold-compress':
        return (
          <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
            <path d="M208,89.37V88A80,80,0,0,0,48,88v1.37A24,24,0,0,0,56,136h3.36l61.69,108a8,8,0,0,0,13.9,0l61.69-108H200a24,24,0,0,0,8-46.63ZM128,223.88,77.79,136H97.07l40.57,71ZM134.79,136l21.71,38-9.64,16.88L115.5,136Zm30.92,21.88L153.21,136h25ZM200,120H56a8,8,0,0,1,0-16,8,8,0,0,0,8-8V88a64,64,0,0,1,128,0v8a8,8,0,0,0,8,8,8,8,0,0,1,0,16Z"></path>
          </svg>
        )
      case 'bath':
        return (
          <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
            <path d="M232,96H208a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8H64V52A12,12,0,0,1,76,40a12.44,12.44,0,0,1,12.16,9.59,8,8,0,0,0,15.68-3.18A28.32,28.32,0,0,0,76,24,28,28,0,0,0,48,52V96H24A16,16,0,0,0,8,112v32a56.06,56.06,0,0,0,56,56v16a8,8,0,0,0,16,0V200h96v16a8,8,0,0,0,16,0V200a56.06,56.06,0,0,0,56-56V112A16,16,0,0,0,232,96Zm-40,8v32H144V104Zm40,40a40,40,0,0,1-40,40H64a40,40,0,0,1-40-40V112H128v32a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V112h24Z"></path>
          </svg>
        )
      case 'moisturize':
        return (
          <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
            <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>
          </svg>
        )
      default:
        return null
    }
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
                <p className="text-white text-sm font-medium">{diagnosisData.diagnosis.confidence}% Confidence</p>
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
              {diagnosisData.diagnosis.condition.name}
            </h2>
            <p className="text-gray-600 text-base font-normal leading-relaxed mt-2">
              {diagnosisData.diagnosis.condition.description}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
            Treatment Suggestions
          </h2>
          
          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2">
            Over-the-Counter Products
          </h3>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2">
            <div className="flex items-stretch px-4 gap-4">
              {diagnosisData.diagnosis.treatments.over_the_counter.map((product, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-2xl bg-white p-3 min-w-44 shadow-sm">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{ backgroundImage: `url("${product.image_url}")` }}
                  ></div>
                  <div>
                    <p className="text-gray-900 text-base font-medium leading-normal">{product.name}</p>
                    <p className="text-gray-600 text-sm font-normal leading-normal">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Home Remedies
          </h3>
          <div className="space-y-2 px-4">
            {diagnosisData.diagnosis.treatments.home_remedies.map((remedy, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                <div className="text-[#1993e5] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12">
                  {getIconSvg(remedy.icon)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-base font-medium leading-normal">{remedy.title}</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal">{remedy.description}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-gray-900 text-lg font-semibold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">
            When to See a Doctor
          </h3>
          <div className="space-y-2 px-4">
            {[...diagnosisData.diagnosis.warning_signs.seek_immediate_care, ...diagnosisData.diagnosis.warning_signs.seek_medical_consultation].map((warning, index) => (
              <div key={index} className="flex items-center gap-4 bg-red-50 p-3 rounded-xl border border-red-100">
                <div className="text-red-500 flex items-center justify-center rounded-lg bg-red-100 shrink-0 size-10">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                  </svg>
                </div>
                <p className="text-red-900 text-sm font-medium leading-normal flex-1">{warning.symptom}</p>
              </div>
            ))}
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
