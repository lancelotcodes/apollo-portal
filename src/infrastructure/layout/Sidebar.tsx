import React, { Fragment, useEffect } from 'react';
import { classNames } from '@/helpers/classNames';
import { Link } from 'react-router-dom';
import { navChanged } from '../store/features/app/app-slice';
import { useAppDispatch, useAppSelector } from '../store/store-hooks';
import { AppNavigation } from './nav-items';
import { Popover, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Nav from './Nav';

const Sidebar = () => {
  const navigation = useAppSelector((state) => state.app.navigation);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(navChanged(window.location.pathname));
  }, [appDispatch]);
  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'relative bg-white border-b border-gray-blue-2 lg:static lg:overflow-y-visible',
        )
      }
    >
      {() => (
        <>
          {/* Narrow sidebar */}
          <div className="hidden w-[104px] h-full bg-white overflow-y-auto md:block border-r border-gray-blue-2">
            <div className="w-full py-4 flex flex-col items-center">
              <div className="flex-shrink-0 flex items-center justify-between">
                <img className="h-10 w-auto" src="/logo-2.png" alt="KMC Savills Logo" />
                <Popover.Button>
                  <ChevronRightIcon className={'w-5 h-5'} />
                </Popover.Button>
              </div>
              <div className="flex-1 mt-6 w-full px-4 space-y-1">
                {AppNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => appDispatch(navChanged(item.href))}
                    className={classNames(
                      navigation === item.href ? 'bg-blue-2 text-black' : 'hover:bg-bg-blue-2 text-gray-7',
                      'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-in-out  duration-700"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in-out duration-700"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              as="nav"
              className="absolute bg-white h-screen w-64 top-0 border-r border-gray-blue-2"
              aria-label="Global"
            >
              {({ close }) => <Nav close={close} />}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Sidebar;
