import { PricingPage as SDSPricingPage } from 'sds-projects'
import { Footer } from './Footer'

const features = ['Unlimited screenshots', 'Pixel-perfect results', 'Efficiency boost']

export function PricingPage() {
  return (
    <div className="m-auto text-center text-gray-800 mt-8 w-full">
      <img alt="" src="/images/banner.jpg" className="h-40 sm:h-52 rounded-md mb-8 shadow-lg" />
      <div className="bg-purple-50 py-8 sm:py-12">
        <h2 className="text-purple-900 font-semibold text-3xl sm:text-5xl mb-2">Simple pricing, no commitment.</h2>
        <p>Everything you need, nothing you don't.</p>
      </div>
      <SDSPricingPage
        customTheme={{
          colors: {
            primaryButton: 'text-white bg-purple-700 border border-purple-700 hover:opacity-80',
            secondaryButton: 'cursor-not-allowed text-purple-700/90 border border-purple-700/90',
            icon: 'text-purple-500',
            primaryCard: 'border border-purple-700',
            secondaryCard: 'border border-purple-700 md:border-r-0',
            badge: 'text-white bg-purple-700/80',
          },
        }}
        freeTierFeatures={features}
      />
      <Footer className="py-8 sm:py-12" />
    </div>
  )
}
