import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { AppNavigation } from './nav-items';
import React from 'react';

const MobileNav: FCC = () => {
  return (
    <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
      {AppNavigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
          className={classNames(
            item.current ? 'bg-blue-2 text-black' : 'hover:bg-bg-blue-2 text-gray-7',
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

export default MobileNav;
