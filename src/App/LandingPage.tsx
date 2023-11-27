import { Footer } from './Footer'
import { Title } from './Title'

export const LandingPage = () => {
  return (
    <main className="flex flex-col w-full text-center space-y-8 sm:space-y-12 h-full text-gray-800">
      <section className="mt-8 px-6">
        <div className="py-6 mx-auto lg:py-12">
          <Title className="text-2xl md:text-5xl mb-3" />
          <p className="text-lg lg:text-xl sm:px-16 lg:px-48">Your ultimate Chrome extension for layout comparison!</p>
        </div>
      </section>
      <section className="bg-purple-50 py-6 lg:py-12 px-6 space-y-4 flex flex-col items-center">
        <h2 className="font-semibold text-xl sm:text-2xl text-purple-950">
          Try Layout Comparison today: available for FREE on the Chrome web store!
        </h2>
        <a
          href="https://chromewebstore.google.com/detail/pic-go/kaebiloefbpmnihheoceockhjdmjbhcn?hl=en"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-md disabled:opacity-25 disabled:cursor-not-allowed"
        >
          Download Now
        </a>
      </section>
      <section className="px-6 max-w-3xl m-auto space-y-8 sm:space-y-12">
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-900">How it works?</h3>
        <div className="flex gap-4 items-center justify-between">
          <img
            className="border-2 border-purple-700 h-36 sm:h-44 rounded-xl"
            src="/images/extension.png"
            alt="Layout Comparison extension"
          />
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">
              1. Launch the extension and capture a screenshot
            </h3>
            <p>Retrieve designs from your preferred platforms such as Figma, Miro, and others.</p>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">
              2. Return to your application and adjust the opacity
            </h3>
            <p>Examine the overlay that has been applied and identify areas that need adjustment.</p>
          </div>
          <img alt="" src="/images/opacity.png" className="border-2 border-purple-700 h-60 sm:h-80 rounded-xl" />
        </div>
        <div className="flex gap-4 justify-between">
          <img alt="" src="/images/apply.png" className="border-2 border-purple-700 h-60 sm:h-80 rounded-xl" />
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">3. Apply the screenshot</h3>
            <p>Save the adjusted opacity on the current page for future reference.</p>
          </div>
        </div>
      </section>

      <Footer className="bg-purple-50 max-w-full w-full py-8" />
    </main>
  )
}
