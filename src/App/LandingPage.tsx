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
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-md disabled:opacity-25 disabled:cursor-not-allowed"
        >
          Download Now
        </a>
      </section>
      <section className="px-6 max-w-3xl m-auto space-y-8 sm:space-y-12">
        <div className="flex gap-4 justify-between">
          <img alt="" src="/images/feature1.jpg" className="w-36 h-36 sm:w-52 sm:h-52 rounded-xl" />
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">Tired of pixel-perfect web design?</h3>
            <p>Take your projects to the next level with Layout Comparison.</p>

            <h3 className="text-lg sm:text-xl font-semibold text-purple-900 mt-4">Capture Screenshots:</h3>
            <p>Easily snap screenshots of web pages with a click.</p>
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">Compare Layouts:</h3>
            <p>Seamlessly compare multiple screenshots to spot even the tiniest design variations.</p>

            <h3 className="text-lg sm:text-xl font-semibold text-purple-900 mt-4">Boost Efficiency:</h3>
            <p>Streamline your design workflow, collaborate with your team, and deliver pixel-perfect results.</p>
          </div>
          <img alt="" src="/images/feature2.jpg" className="w-36 h-36 sm:w-52 sm:h-52 rounded-xl" />
        </div>

        <div className="flex gap-4 justify-between">
          <img alt="" src="/images/feature3.jpg" className="w-36 h-36 sm:w-52 sm:h-52 rounded-xl" />
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900">For Designers, Developers, and Beyond:</h3>
            <p>Perfect for web designers, developers, and anyone seeking pixel-precision in web layouts.</p>
          </div>
        </div>
      </section>

      <Footer className="bg-purple-50 max-w-full w-full py-8" />
    </main>
  )
}
