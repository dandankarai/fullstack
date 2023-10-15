import Link from 'next/link'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FiScissors, FiClipboard, FiSettings } from 'react-icons/fi'

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-50 dark:bg-gray-700" >
        <div className="px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
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
        </div>
      </nav>
    </>
  )
}