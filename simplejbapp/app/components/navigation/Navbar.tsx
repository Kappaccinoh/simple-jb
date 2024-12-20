'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Navbar() {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                JobBoard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-white"
              >
                Jobs
              </Link>
              <Link
                href="/applications"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-300 dark:hover:text-white"
              >
                Applications
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="bg-blue-600 p-1 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
            >
              <span className="sr-only">Post a Job</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/placeholder-avatar.jpg"
                    alt=""
                    width={32}
                    height={32}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/settings"
                        className={classNames(
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        )}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        )}
                        onClick={() => {/* Add logout handler */}}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
} 