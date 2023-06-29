import { classNames } from '@/helpers/classNames';
import {
  PersonalProfileTabType,
  setProfileTab,
} from '@/infrastructure/store/features/personal-profile/personal-profile-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React from 'react';

const profileTabs: PersonalProfileTabType[] = ['Personal Details', 'Work Details', 'Customization'];

const PersonalProfileTab: React.FC = () => {
  const personalProfileTab = useAppSelector((app) => app['personal-profile'].personalProfileTab);

  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4 bg-white">
      <div className="px-2 sm:px-4 border-b border-gray-blue-2">
        <nav className="-mb-px flex gap-1 sm:gap-2" aria-label="Tabs">
          {profileTabs.map((tab) => (
            <button
              onClick={() => dispatch(setProfileTab(tab))}
              key={tab}
              className={classNames(
                'py-2 relative px-2 sm:px-3 rounded-t-lg border-t border-l border-r duration-75 transition-all',
                personalProfileTab === tab ? 'bg-gray-blue-1 border-gray-blue-2' : 'bg-none border-transparent',
              )}
              aria-current={personalProfileTab === tab ? 'page' : undefined}
            >
              <span
                className={classNames(
                  'typography-body font-normal duration-75 transition-color',
                  personalProfileTab === tab ? 'text-black' : 'text-gray-7',
                )}
              >
                {tab}

                <span
                  className={classNames(
                    'absolute w-8/12 h-0.5 rounded-full bottom-0 left-1/2 -translate-x-1/2 box-content duration-75 transition-color',
                    personalProfileTab === tab ? 'bg-blue-4' : 'bg-transparent',
                  )}
                />
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PersonalProfileTab;
