import { BuildingOfficeIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/outline'
import * as Sentry from '@sentry/react'
import '@typeform/embed/build/css/popup.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SdsNavbar, WhoMadeThisPage } from 'sds-projects'
import { ExtensionPage } from './ExtensionPage'
import { LandingPage } from './LandingPage'
import { PricingPage } from './PricingPage'

Sentry.init({
  dsn: 'https://beb1960ebe187c27613b37b4a4249ade@o323538.ingest.sentry.io/4506196190887936',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/layoutcomparison\.com/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const navigation = [
  { name: 'Home', page: '/', icon: HomeIcon },
  { name: 'Pricing', page: '/pricing', icon: CurrencyDollarIcon },
  {
    name: 'Who made this?',
    page: '/who-made-this',
    icon: BuildingOfficeIcon,
  },
]

const navbarTheme = {
  colors: {
    background: 'bg-purple-50',
    border: 'border-purple-200',
    tabs: 'text-purple-900 hover:bg-purple-400/20',
    hover: 'hover:bg-neutral-400/20',
  },
}
export const App = () => {
  if (chrome.runtime) {
    return <ExtensionPage />
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/pricing',
      element: <PricingPage />,
    },
    {
      path: '/who-made-this',
      element: <WhoMadeThisPage />,
    },
  ])

  return (
    <SdsNavbar projectName="Layout Comparison" customTheme={navbarTheme} navigation={navigation} hideUserMenu>
      <RouterProvider router={router} />
    </SdsNavbar>
  )
}
