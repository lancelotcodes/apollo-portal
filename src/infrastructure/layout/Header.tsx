import React from 'react';
import Button from '@/components/core/Button';
import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { Menu, Popover, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { MdOutlineAdd } from 'react-icons/md';
import { Fragment } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import { AccountIcon, NotificationIcon, SearchIcon } from '@/components/core/Icon';
import MobileNav from './MobileNav';
import { useLogoutMutation } from '../store/api/auth/auth-api';
import { clearAuth } from '../store/features/auth/auth-slice';
import { useAppDispatch } from '../store/store-hooks';
import { Link } from 'react-router-dom';
import { clearNavChanged } from '../store/features/app/app-slice';
import { toggleCreateNewItemDialog } from '../store/features/property-list/property-list-slice';

const userNavigation = [{ name: 'Your Profile', href: '/profile' }];

const Header: FCC = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(null);
      dispatch(clearAuth());
      dispatch(clearNavChanged());

      ('auth cleared');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white border-b border-gray-blue-2 lg:static lg:overflow-y-visible',
        )
      }
    >
      {({ open }) => (
        <>
          <div className=" mx-auto px-4">
            <div className="relative flex justify-between gap-4">
              {/* Logo */}
              <div className="md:hidden flex md:absolute md:left-0 md:inset-y-0 lg:static">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    <img className="block h-10 w-auto" src="/logo.png" alt="KMC-Savills Logo" />
                  </a>
                </div>
              </div>

              <div className="flex-0 md:flex justify-center items-center hidden">
                <Button
                  icon={<MdOutlineAdd className="inline h-6 w-6" />}
                  onClick={() => dispatch(toggleCreateNewItemDialog(true))}
                >
                  CREATE
                </Button>
              </div>

              {/* Search */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center py-4 :mx-0 xl:px-0">
                  <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <SearchIcon aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center md:right-0 md:inset-y-0 md:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-blue-5">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6 text-gray-blue-6" aria-hidden="true" />
                  ) : (
                    <CgMenuRight className="block h-6 w-6 text-gray-blue-6 -scale-x-100" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>

              {/* Mobile Navigation */}
              <div className="hidden md:flex md:items-center md:justify-end xl:col-span-4 gap-4">
                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-blue-4">
                      <NotificationIcon />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Menu as="div" className="flex-shrink-0 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-blue-4">
                      <AccountIcon />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block py-2 px-4 text-sm text-gray-700 font-normal w-full text-left',
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <MobileNav />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Header;
