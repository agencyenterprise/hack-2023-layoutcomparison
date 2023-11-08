import { BuildingOfficeIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/outline'
import '@typeform/embed/build/css/popup.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SdsNavbar, WhoMadeThisPage } from 'sds-projects'
import { ExtensionPage } from './ExtensionPage'
import { LandingPage } from './LandingPage'
import { PricingPage } from './PricingPage'

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
