function screenshot() {
  const element = document.querySelector('body')

  html2canvas(element).then((canvas) => {
    const canvasImage = canvas.toDataURL('image/png')

    chrome.storage.local.set({ image: canvasImage })
  })
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.message === 'init') {
    res({}) // prevent re-injecting

    screenshot()
  }

  return true
})
