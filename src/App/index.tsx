import html2canvas from 'html2canvas'
// import './index.css'

export const App = () => {
  // async function exportComponentToImage() {
  //   const element = document.querySelector<HTMLElement>('[data-selector="repos-split-pane-content"]')

  //   console.log(element)

  //   if (!element) return

  //   const canvas = await html2canvas(element)

  //   console.log(canvas)

  //   // const imageData = canvas.toDataURL('image/png')
  //   document.body.appendChild(canvas)

  //   const h1 = document.createElement('h1')
  //   h1.innerText = 'TESTANDO'
  //   document.body.appendChild(h1)
  // }

  // async function runScript() {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  //   if (!tab.id) return

  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     func: exportComponentToImage,
  //   })
  // }

  async function sendMessage() {
    chrome.runtime.sendMessage('export')
  }

  return (
    <div className="p-8">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>

        <button className="button text-red-500" onClick={sendMessage}>
          Export
        </button>

        <img alt="alt" width={200} src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" />
      </header>
    </div>
  )
}
