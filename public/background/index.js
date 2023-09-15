try {
  async function takeScreenshot() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    chrome.tabs.sendMessage(tab.id, 'init', (res) => {
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

      setTimeout(() => chrome.tabs.sendMessage(tab.id, 'init'), 100)
    }, 100)
  }

  async function applyScreenshot() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    chrome.storage.local.get('screenshot', (data) => {
      const imageData = data.screenshot
      console.log(imageData)

      const color = '#00ff00'
      function changeBackgroundColor(backgroundColor) {
        document.body.style.backgroundColor = backgroundColor
        document.body.style.fontSize = '500%'
      }
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: changeBackgroundColor,
        args: [color],
      })

      if (imageData) {
        // chrome.scripting.executeScript({
        //   target: { tabId: tab.id },
        //   func: () => {
        //     const img = document.createElement('img')
        //     img.src = `${imageData}`
        //     img.width = '500px'
        //     document.body.appendChild(img)
        //     // const imageOpacity = 50
        //     // const imageData = data.screenshot
        //     // const existingImage = document.getElementById('pixel-perfect-image')
        //     // if (existingImage) {
        //     //   existingImage.style.opacity = String(imageOpacity / 100)
        //     // } else {
        //     // const img = document.createElement('img')
        //     // img.src = imageData
        //     // img.id = 'pixel-perfect-image'
        //     // img.style.width = '100%'
        //     // img.style.position = 'absolute'
        //     // img.style.top = '0'
        //     // img.style.bottom = '0'
        //     // img.style.left = '0'
        //     // img.style.right = '0'
        //     // img.style.pointerEvents = 'none'
        //     // img.style.opacity = String(imageOpacity / 100)
        //     // document.body.appendChild(img)
        //     // }
        //   },
        // })
      }
    })
  }

  chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    console.log(message, sender, sendResponse)

    switch (message) {
      case 'takeScreenshot':
        chrome.runtime.sendMessage('takeScreenshotStarted')

        await takeScreenshot()
        break
      case 'applyScreenshot':
        chrome.runtime.sendMessage('applyScreenshotStarted')

        await applyScreenshot()
        break
      default:
        break
    }
  })
} catch (e) {
  console.error(e)
}
