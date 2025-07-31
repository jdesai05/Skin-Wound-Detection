'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ExtendedMediaTrackCapabilities extends MediaTrackCapabilities {
  torch?: boolean
  focusMode?: string[]
}

interface ExtendedMediaTrackConstraintSet extends MediaTrackConstraintSet {
  torch?: boolean
  focusMode?: string
}

export default function ScansPage() {
  const [isCamera, setIsCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [flashMode, setFlashMode] = useState('off')
  const [focusMode, setFocusMode] = useState('auto')
  const [timerActive, setTimerActive] = useState(false)
  const [timerCount, setTimerCount] = useState(0)
  const [currentCamera, setCurrentCamera] = useState('environment')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const toggleFlash = () => {
    const modes = ['off', 'on', 'auto']
    const currentIndex = modes.indexOf(flashMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setFlashMode(nextMode)

    if (videoRef.current && videoRef.current.srcObject) {
      const track = (videoRef.current.srcObject as MediaStream).getVideoTracks()[0]
      const capabilities = track.getCapabilities() as ExtendedMediaTrackCapabilities
      
      if (capabilities.torch) {
        const constraints: ExtendedMediaTrackConstraintSet = { torch: nextMode === 'on' }
        track.applyConstraints({
          advanced: [constraints]
        }).catch(error => {
          console.warn('Flash control not supported:', error)
        })
      }
    }
  }

  const handleAutoFocus = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const track = (videoRef.current.srcObject as MediaStream).getVideoTracks()[0]
      const capabilities = track.getCapabilities() as ExtendedMediaTrackCapabilities
      
      if (capabilities.focusMode?.includes('single-shot')) {
        const constraints: ExtendedMediaTrackConstraintSet = { focusMode: 'single-shot' }
        track.applyConstraints({
          advanced: [constraints]
        }).catch(error => {
          console.warn('Auto focus not supported:', error)
        })
      }
    }
  }

  const toggleFocusMode = () => {
    const newMode = focusMode === 'auto' ? 'manual' : 'auto'
    setFocusMode(newMode)
    
    if (videoRef.current && videoRef.current.srcObject) {
      const track = (videoRef.current.srcObject as MediaStream).getVideoTracks()[0]
      const capabilities = track.getCapabilities() as ExtendedMediaTrackCapabilities
      
      if (capabilities.focusMode) {
        const focusModeValue = newMode === 'auto' ? 'continuous' : 'manual'
        if (capabilities.focusMode.includes(focusModeValue)) {
          const constraints: ExtendedMediaTrackConstraintSet = { focusMode: focusModeValue }
          track.applyConstraints({
            advanced: [constraints]
          }).catch(error => {
            console.warn('Focus mode control not supported:', error)
          })
        }
      }
    }
  }

  const toggleTimer = () => {
    if (timerActive) {
      setTimerActive(false)
      setTimerCount(0)
    } else {
      setTimerActive(true)
      setTimerCount(3)
      
      const countdown = setInterval(() => {
        setTimerCount(prev => {
          if (prev <= 1) {
            clearInterval(countdown)
            setTimerActive(false)
            captureImage()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCamera(false)
  }

  const confirmPhoto = () => {
    console.log('Photo confirmed')
    // just a logic to check if photo is good 
  }

  const startCamera = async () => {
    try {
      console.log('Starting camera...')
      
      // This checks, if there are ny existing streams and stops them, do not delete this, it's crucial for media and content management
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      
      setIsCamera(true)
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      let videoElement = videoRef.current
      let retries = 0
      while (!videoElement && retries < 10) {
        console.log(`Waiting for video element... attempt ${retries + 1}`)
        await new Promise(resolve => setTimeout(resolve, 100))
        videoElement = videoRef.current
        retries++
      }
      
      if (!videoElement) {
        throw new Error('Video element not found after retries')
      }
      
      console.log('✅ Video element found')
      
      let constraints: MediaStreamConstraints = {
        video: {
          facingMode: currentCamera //it uses the default camera in any device (mobile - back camera, desktop - webcam)
        }
      }
    
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      console.log('✅ Camera access granted:', mediaStream)
      
      const video = videoElement
      
      video.srcObject = null
      video.srcObject = mediaStream
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      
      await new Promise<void>((resolve, reject) => {
        const onLoadedMetadata = async () => {
          try {
            await video.play()
            resolve()
          } catch (playError) {
            reject(playError)
          }
        }
        
        const onError = (error: any) => {
          reject(error)
        }
        
        video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true })
        video.addEventListener('error', onError, { once: true })
        
        setTimeout(() => {
          reject(new Error('Video loading timeout'))
        }, 10000)
      })
      
      // Update state
      setStream(mediaStream)
      
    } catch (error) {
      console.error('❌ Camera error:', error)
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
      }
      setIsCamera(false)
      
      alert(`Camera error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCamera(false)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }

  const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!capturedImage) return

    setIsAnalyzing(true)
    
    setTimeout(() => {
      setIsAnalyzing(false)
      
      // Update this logic as required for you - Suramya
      localStorage.setItem('scanImage', capturedImage)
      router.push('./scans/diagnosis')
    }, 3000)
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    startCamera()
  }

  return (
    <div className="relative min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center p-4 justify-between">
          <button 
            onClick={() => router.back()}
            className="text-gray-700 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">SkinAid Scan</h2>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="pt-20">
        <p className="text-gray-600 text-base font-normal leading-normal pb-3 pt-1 px-6 text-center">
          Ensure good lighting. Avoid blur. Center the skin area.
        </p>
        
        <div className="p-4">
          <div className="relative flex items-center justify-center bg-gray-200 bg-cover bg-center aspect-[3/4] rounded-2xl overflow-hidden min-h-[600px]">
            {isCamera ? (
              <>
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover bg-black"
                  onLoadStart={() => console.log('📹 Video load started')}
                  onCanPlay={() => console.log('📹 Video can play')}
                  onPlaying={() => console.log('📹 Video is playing')}
                  onLoadedMetadata={() => console.log('📹 Video metadata loaded')}
                  onError={(e) => console.error('📹 Video error:', e)}
                  onSuspend={() => console.log('📹 Video suspended')}
                  onWaiting={() => console.log('📹 Video waiting')}
                />
                
                {/* Larger targeting guide */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 border-2 border-dashed border-white/70 rounded-full flex items-center justify-center">
                    <div className="w-64 h-64 border border-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Top Controls Bar */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  {/* Flash Control */}
                  <button
                    onClick={toggleFlash}
                    className={`p-3 rounded-full ${flashMode === 'on' ? 'bg-yellow-500' : 'bg-black/50'} text-white hover:bg-opacity-80 transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                    </svg>
                  </button>
                  
                  {/* Close Camera */}
                  <button
                    onClick={closeCamera}
                    className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Focus Control */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleAutoFocus}
                      className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      </svg>
                    </button>
                    
                    <button
                      onClick={toggleFocusMode}
                      className={`p-3 rounded-full ${focusMode === 'manual' ? 'bg-blue-500' : 'bg-black/50'} text-white hover:bg-opacity-80 transition-colors`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center">
                  {/* Capture Button */}
                  <button
                    onClick={captureImage}
                    className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-105 transition-transform shadow-lg mr-4"
                  >
                    <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-400"></div>
                  </button>
                  
                  {/* Timer Button */}
                  <button
                    onClick={toggleTimer}
                    className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Timer Countdown */}
                {timerActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-8xl font-bold">
                      {timerCount}
                    </div>
                  </div>
                )}
              </>
            ) : capturedImage ? (
              <>
                {/* Captured Image Preview */}
                <img
                  src={capturedImage}
                  alt="Captured skin area"
                  className="w-full h-full object-cover"
                />
                
                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={retakePhoto}
                    className="bg-black/50 text-white px-4 py-2 rounded-full text-sm hover:bg-black/70 transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    onClick={confirmPhoto}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Default View */}
                <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center">
                  <div className="w-80 h-80 border-2 border-dashed border-gray-400 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="text-gray-400" fill="currentColor" height="100px" viewBox="0 0 256 256" width="100px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleGalleryUpload}
          className="hidden"
        />

        {/* Bottom Controls */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
          {!isCamera && !capturedImage && (
            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 gap-2 items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-gray-200 text-gray-800 text-base font-bold leading-normal tracking-[-0.015em] hover:bg-gray-300 transition-colors"
              >
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31L188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-48a8,8,0,0,1-8,8H96a8,8,0,0,1-5.66-13.66l48-48a8,8,0,0,1,11.32,11.32L102.63,160H160A8,8,0,0,1,168,168Z"></path>
                </svg>
                <span className="truncate">Gallery</span>
              </button>
              <button 
                onClick={startCamera}
                className="flex flex-1 gap-2 items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-gray-200 text-gray-800 text-base font-bold leading-normal tracking-[-0.015em] hover:bg-gray-300 transition-colors"
              >
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208,56H180.28L166.65,35.56A16,16,0,0,0,152.28,28H103.72a16,16,0,0,0-14.37,7.56L75.72,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm-80,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path>
                </svg>
                <span className="truncate">Camera</span>
              </button>
            </div>
          )}
          
          {isCamera && (
            <div className="flex gap-4 mb-4">
              <button 
                onClick={stopCamera}
                className="flex flex-1 gap-2 items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-red-500 text-white text-base font-bold leading-normal hover:bg-red-600 transition-colors"
              >
                <span className="truncate">Cancel</span>
              </button>
            </div>
          )}

          {capturedImage && (
            <button 
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 w-full text-white text-lg font-bold leading-normal tracking-[-0.015em] transition-colors shadow-lg ${
                isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#1993e5] hover:bg-blue-600 shadow-blue-500/30'
              }`}
            >
              <span className="truncate">
                {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
              </span>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}