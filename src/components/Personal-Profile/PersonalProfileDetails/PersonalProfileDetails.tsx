import React, { lazy, Suspense } from 'react';
import Button from '@/components/core/Button';
import { EditIcon } from '@/components/core/Icon';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { toggleEditProfileDetails } from '@/infrastructure/store/features/personal-profile/personal-profile-slice';

const PersonalProfileDetailsForm = lazy(() => import('./PersonalProfileDetailsForm'));

const PersonalProfileDetails = () => {
  const isEditingProfileDetails = useAppSelector((app) => app['personal-profile'].isEditingProfileDetails);

  const dispatch = useAppDispatch();

  return (
    <section className="bg-white border border-gray-blue-2 p-4 rounded-lg space-y-4 mb-[75px]">
      <div className="flex gap-2 items-end h-6">
        {!isEditingProfileDetails && (
          <button
            className="text-gray-blue-6 hover:text-gray-blue-9"
            onClick={() => dispatch(toggleEditProfileDetails(true))}
          >
            <EditIcon />
          </button>
        )}
        <h3 className="font-bold">Personal Details</h3>
      </div>

      {!isEditingProfileDetails && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="rounded bg-gray-blue-2 h-[232px] w-[232px] self-center md:self-start"></div>
          <div className="flex-1">
            <ul className="px-4 pb-4">
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Team ID</span>
                <span className="typography-body text-black flex-1">5642</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Username</span>
                <span className="typography-body text-black flex-1">@aaronramos</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">First name</span>
                <span className="typography-body text-black flex-1">Aaron</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Last name</span>
                <span className="typography-body text-black flex-1">Ramos</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">E-mail</span>
                <span className="typography-body text-black flex-1">N/A</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Phone number</span>
                <span className="typography-body text-black flex-1">+63 995 8127 204</span>
              </li>
              <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Password</span>
                <span className="typography-body text-black flex-1">
                  &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      <Suspense fallback={<></>}>{isEditingProfileDetails && <PersonalProfileDetailsForm />}</Suspense>

      {isEditingProfileDetails && (
        <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
          <div className="flex justify-between">
            <Button btnType="secondary-gray" onClick={() => dispatch(toggleEditProfileDetails(false))}>
              CANCEL
            </Button>
            <Button>SAVE</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalProfileDetails;
