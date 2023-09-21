import { useState, useEffect } from 'react'
import { CameraIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import screenshot1 from '../assets/screenshot1.jpeg'
import screenshot2 from '../assets/screenshot2.jpeg'
import screenshot3 from '../assets/screenshot3.jpeg'
import screenshot4 from '../assets/screenshot4.jpeg'
import screenshot5 from '../assets/screenshot5.png'

type Message = {
  text: string
  color: string
  image: string
}

const defaultMessage: Message = {
  text: '',
  color: '',
  image: '',
}

export const App = () => {
  const [message, setMessage] = useState<Message | null>(defaultMessage)
  const [imageData, setImageData] = useState('')
  const [imageOpacity, setImageOpacity] = useState(50)

  function takeScreenshot() {
    chrome.runtime.sendMessage({ message: 'takeScreenshot' })
    setImageOpacity(50)
    chrome.storage.local.set({ opacity: 50 })
  }

  function applyScreenshot(opacity: number = imageOpacity) {
    chrome.runtime.sendMessage({ message: 'applyScreenshot', imageOpacity: opacity })
  }

  function applyOpacity(opacity: number = imageOpacity) {
    chrome.runtime.sendMessage({ message: 'applyOpacity', imageOpacity: opacity })
  }

  function getScreenshot() {
    chrome.storage.local.get('screenshot', (data: any) => {
      if (data.screenshot) {
        setImageData(data.screenshot)
      }
    })
  }

  function getOpacity() {
    chrome.storage.local.get('opacity', (data: any) => {
      if (data.opacity) {
        setImageOpacity(data.opacity)
      }
    })
  }

  function clear() {
    setMessage({
      text: 'Cleaning Screenshot...',
      color: 'red',
      image: screenshot5,
    })

    setTimeout(() => {
      setImageData('')
      setImageOpacity(50)
      chrome.storage.local.clear()
      setMessage(defaultMessage)
    }, 5000)
  }

  function clearMessageinSeconds(seconds = 5) {
    setTimeout(() => {
      setMessage(defaultMessage)
    }, seconds * 1000)
  }

  useEffect(() => {
    getScreenshot()
    getOpacity()
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((data: any) => {
      switch (data.message) {
        case 'takeScreenshotStarted':
          setMessage({
            text: 'Taking Screenshot...',
            color: 'orange',
            image: screenshot1,
          })
          setImageData('')

          break
        case 'takeScreenshotFinished':
          setMessage({
            text: 'Screenshot Taken!',
            color: 'green',
            image: screenshot2,
          })
          setImageData(data.screenshot)
          clearMessageinSeconds()

          break
        case 'applyScreenshotStarted':
          setMessage({
            text: 'Applying Screenshot...',
            color: 'orange',
            image: screenshot3,
          })

          break
        case 'applyScreenshotFinished':
          setMessage({
            text: 'Screenshot Applied!',
            color: 'green',
            image: screenshot4,
          })
          clearMessageinSeconds()

          break
        default:
          break
      }
    })
  }, [])

  return (
    <div className="p-4 shadow-lg rounded-lg w-[400px]">
      <header className="App-header">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-4">Cool Title Here</h1>

        <div className="flex items-center justify-center gap-2">
          <button
            className="flex items-center gap-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-md disabled:opacity-25 disabled:cursor-not-allowed"
            onClick={takeScreenshot}
            disabled={!!message?.text}
          >
            Take Screenshot <CameraIcon className="h-6 w-6" />
          </button>

          <button
            className="flex items-center gap-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md disabled:opacity-25 disabled:cursor-not-allowed"
            onClick={() => applyScreenshot()}
            disabled={!imageData || !!message?.text}
          >
            Apply Screenshot <PhotoIcon className="h-6 w-6" />
          </button>
        </div>

        {message?.text && (
          <div
            className={twMerge(
              clsx(
                `my-4 border-t-4  rounded-b  p-4 shadow-md rounded-lg`,
                message.color === 'orange' && 'bg-orange-100 border-orange-500 text-orange-900',
                message.color === 'green' && 'bg-green-100 border-green-500 text-green-900',
                message.color === 'red' && 'bg-red-100 border-red-500 text-red-900',
              ),
            )}
            role="alert"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between mb-4">
                <svg
                  className={twMerge(
                    clsx(
                      `fill-current h-6 w-6 mr-4`,
                      message.color === 'orange' && 'text-orange-500',
                      message.color === 'green' && 'text-green-500',
                      message.color === 'red' && 'text-red-500',
                    ),
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
                <p className="font-bold">{message.text}</p>
                <div />
              </div>
              <img alt="funny" className="w-96 border shadow-lg" src={message.image} />
            </div>
          </div>
        )}

        {imageData && (
          <>
            <div className="my-4">
              <label htmlFor="opacity-slider" className="block text-sm font-medium text-gray-900">
                Screenshot Opacity: {imageOpacity}%
              </label>
              <input
                id="opacity-slider"
                type="range"
                value={imageOpacity}
                step={5}
                onChange={(e) => {
                  const imageOpacity = Number(e.target.value)

                  setImageOpacity(imageOpacity)
                  applyOpacity(imageOpacity)
                  chrome.storage.local.set({ opacity: imageOpacity })
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center relative">
              <XMarkIcon
                className="h-5 w-5 text-red-300 absolute top-9 right-2 hover:text-red-500 cursor-pointer"
                onClick={clear}
              />
              <p className="text-center text-gray-700 text-sm mb-2">Screenshot Preview:</p>
              <img alt="screenshot preview" className="w-96 border shadow-lg" src={imageData} />
            </div>
          </>
        )}
      </header>
    </div>
  )
}
