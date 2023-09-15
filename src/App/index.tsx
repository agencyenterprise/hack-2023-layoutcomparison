import { useState, useEffect } from 'react'
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline'

export const App = () => {
  const [message, setMessage] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageOpacity, setImageOpacity] = useState(100)

  function applyScreenshot() {
    chrome.runtime.sendMessage('applyScreenshot')
  }

  function takeScreenshot() {
    chrome.runtime.sendMessage('takeScreenshot')
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message) {
        case 'takeScreenshotStarted':
          setMessage('Taking Screenshot...')

          break
        case 'takeScreenshotFinished':
          setMessage('Screenshot Taken')

          chrome.storage.local.get('screenshot', (data) => {
            if (data.screenshot) {
              setImageData(data.screenshot)
            }
          })

          break
        case 'applyScreenshotStarted':
          setMessage('Applying Screenshot...')

          break
        case 'applyScreenshotFinished':
          setMessage('Screenshot Applied')

          break
        default:
          break
      }
    })
  }, [])

  useEffect(() => {
    if (!!message) {
      setTimeout(() => setMessage(''), 10 * 1000)
    }
  }, [message])

  return (
    <div className="p-4 shadow-lg rounded-lg w-[400px]">
      <header className="App-header">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-4">
          Pixel Perfect
          <span className="ml-2 text-[#F24E1E]">F</span>
          <span className="text-[#FF7262]">I</span>
          <span className="text-[#A259FF]">G</span>
          <span className="text-[#1ABCFE]">M</span>
          <span className="mr-2 text-[#0ACF83]">A</span>
        </h1>

        <div className="flex items-center justify-center gap-2">
          <button
            className="flex items-center gap-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-md"
            onClick={takeScreenshot}
          >
            Take Screenshot <CameraIcon className="h-6 w-6" />
          </button>

          {imageData && (
            <button
              className="flex items-center gap-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md"
              onClick={applyScreenshot}
            >
              Apply Screenshot <PhotoIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {message && (
          <div
            className="my-2 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">{message}</strong>
            {/* <span className="block sm:inline">Something seriously bad happened.</span> */}
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage('')}>
              <svg
                className="fill-current h-6 w-6 text-blue-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
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
                onChange={(e) => setImageOpacity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-gray-700 text-sm">Screenshot Preview:</p>
              <img alt="alt" className="w-96" src={imageData} />
            </div>
          </>
        )}
      </header>
    </div>
  )
}
