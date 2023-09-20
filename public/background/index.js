try {
  async function getCurrentTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    return tab
  }

  async function takeScreenshot() {
    const tab = await getCurrentTab()

    chrome.tabs.sendMessage(tab.id, { message: 'init' }, (res) => {
      if (res) clearTimeout(timeout)
    })

    const timeout = setTimeout(() => {
      chrome.scripting.executeScript({
        files: ['background/html2canvas.js'],
        target: { tabId: tab.id },
      })

      chrome.scripting.executeScript({
        files: ['background/screenshot.js'],
        target: { tabId: tab.id },
      })

      setTimeout(() => chrome.tabs.sendMessage(tab.id, { message: 'init' }), 100)
    }, 100)
  }

  async function applyScreenshot(imageOpacity = 50) {
    const tab = await getCurrentTab()

    chrome.storage.local.get('screenshot', (data) => {
      const imageData = data.screenshot

      if (imageData) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          args: [imageData, imageOpacity],
          func: (imageData, imageOpacity) => {
            const existingImage = document.getElementById('pixel-perfect-image')

            if (existingImage) {
              existingImage.style.opacity = String(imageOpacity / 100)
            } else {
              const img = document.createElement('img')
              img.src = imageData
              img.id = 'pixel-perfect-image'
              img.style.width = '100%'
              img.style.position = 'absolute'
              img.style.top = 0
              img.style.bottom = 0
              img.style.left = 0
              img.style.right = 0
              img.style.pointerEvents = 'none'
              img.style.opacity = String(imageOpacity / 100)
              img.style.zIndex = 2147483647
              document.body.appendChild(img)
            }
          },
        })

        chrome.runtime.sendMessage({ message: 'applyScreenshotFinished' })
      }
    })
  }

  chrome.runtime.onMessage.addListener(async function (data, sender, sendResponse) {
    console.log(data, sender, sendResponse)

    switch (data.message) {
      case 'takeScreenshot':
        chrome.runtime.sendMessage({ message: 'takeScreenshotStarted' })

        await takeScreenshot()
        break
      case 'applyScreenshot':
        chrome.runtime.sendMessage({ message: 'applyScreenshotStarted' })

        await applyScreenshot(data.imageOpacity)
        break
      case 'applyOpacity':
        await applyScreenshot(data.imageOpacity)
        break
      default:
        break
    }
  })
} catch (e) {
  console.error(e)
}
