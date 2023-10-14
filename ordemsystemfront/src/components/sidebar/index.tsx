import Link from 'next/link'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FiScissors, FiClipboard, FiSettings } from 'react-icons/fi'

interface LinkItemsProps {
  name: string,
  icon: IconType
  route: string
}

export default function Sidebar() {

  const LinkItems: Array<LinkItemsProps> = [
    { name: 'Schedule', icon: FiScissors, route: '/dashboard' },
    { name: 'Haircuts', icon: FiClipboard, route: '/haircuts' },
    { name: 'My account', icon: FiSettings, route: '/profile' }

  ]

  return (
    <>
      <aside id="default-sidebar" className="fixed w-1/5 top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiScissors />
                <span className="ml-3">Shedule</span>
              </Link>
            </li>
            <li>
              <Link href="/haircuts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiClipboard />
                <span className="flex-1 ml-3 whitespace-nowrap">Haircuts</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiSettings />
                <span className="flex-1 ml-3 whitespace-nowrap">My account</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>


    </>
  )
}