import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { AppNavigation } from './nav-items';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../store/store-hooks';
import { navChanged } from '../store/features/app/app-slice';

const Nav: FCC<{ close: () => void }> = ({ close }) => {
  const navigation = useAppSelector((state) => state.app.navigation);
  const appDispatch = useAppDispatch();
  return (
    <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
      {/* Logo */}
      <div className="flex justify-between px-4 py-4  md:absolute md:left-0 md:inset-y-0 lg:static">
        <div className="flex-shrink-0 flex items-center">
          <a href="/">
            <img className="block h-10 w-auto" src="/logo.png" alt="KMC-Savills Logo" />
          </a>
        </div>
        <ChevronLeftIcon className="h-5 w-5 cursor-pointer" onClick={() => close()} />
      </div>
      {AppNavigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
          onClick={() => appDispatch(navChanged(item.href))}
          className={classNames(
            navigation === item.href ? 'bg-blue-2 text-black' : 'hover:bg-bg-blue-2 text-gray-7',
            'flex rounded-md py-2 px-4 text-base font-medium gap-2',
          )}
        >
          <item.icon />
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Nav;
