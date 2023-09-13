try {
  function injectScripts(tab) {
    chrome.tabs.sendMessage(tab.id, { message: 'init' }, (res) => {
      if (res) clearTimeout(timeout)
    })

    var timeout = setTimeout(() => {
      chrome.scripting.executeScript({
        files: ['html2canvas.js'],
        target: { tabId: tab.id },
      })
      chrome.scripting.executeScript({
        files: ['screenshot.js'],
        target: { tabId: tab.id },
      })

      setTimeout(() => chrome.tabs.sendMessage(tab.id, { message: 'init' }), 100)
    }, 100)
  }

  chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    console.log(message, sender, sendResponse)

    switch (message) {
      case 'export':
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

        injectScripts(tabs[0])
        break
      default:
        break
    }
  })
} catch (e) {
  console.error(e)
}
