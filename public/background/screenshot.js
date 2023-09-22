function takeScreenshot() {
  const element = document.querySelector('body')

  html2canvas(element).then((canvas) => {
    var screenshot = canvas.toDataURL('image/png')

    chrome.storage.local.set({ screenshot })

    setTimeout(() => {
      chrome.runtime.sendMessage({ message: 'takeScreenshotFinished', screenshot })
    }, 3000)
  })
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.message === 'init') {
    sendResponse({}) // prevent re-injecting

    takeScreenshot()
  }

  return true
})
