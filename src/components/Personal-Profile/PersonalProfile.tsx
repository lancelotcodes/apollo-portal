import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useEffect, lazy, Suspense } from 'react';
import PersonalProfileDetails from './PersonalProfileDetails/PersonalProfileDetails';
import PersonalProfileTab from './PersonalProfileTab';
import React from 'react';

const WorkDetails = lazy(() => import('./WorkDetails/WorkDetails'));
const Customization = lazy(() => import('./Customization/Customization'));

const PersonalProfile: React.FC = () => {
  const personalProfileTab = useAppSelector((app) => app['personal-profile'].personalProfileTab);

  useEffect(() => {
    document.title = 'My Profile';
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 h-[72px] border-gray-blue-2 bg-white">
        <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0">
          <section className="flex gap-4 lg:justify-start items-center justify-between">
            <h1 className="font-bold text-black">My Profile</h1>
          </section>
        </div>
      </div>

      <PersonalProfileTab />

      <div className="p-4 bg-gray-blue-1">
        {personalProfileTab === 'Personal Details' && <PersonalProfileDetails />}

        <Suspense fallback={<></>}>{personalProfileTab === 'Work Details' && <WorkDetails />}</Suspense>

        <Suspense fallback={<></>}>{personalProfileTab === 'Customization' && <Customization />}</Suspense>
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default PersonalProfile;
