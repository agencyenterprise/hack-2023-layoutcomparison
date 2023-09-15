function takeScreenshot() {
  const element = document.querySelector('body')

  html2canvas(element).then((canvas) => {
    var screenshot = canvas.toDataURL('image/png')

    chrome.storage.local.set({ screenshot })
    chrome.runtime.sendMessage('takeScreenshotFinished')
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'init') {
    sendResponse({}) // prevent re-injecting

    takeScreenshot()
  }

  return true
})
