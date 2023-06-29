import Button from "@/components/core/Button";
import { EditIcon } from "@/components/core/Icon";
import Tag from "@/components/core/Tag";
import { toggleEditWorkDetails } from "@/infrastructure/store/features/personal-profile/personal-profile-slice";
import {
  useAppDispatch,
  useAppSelector
} from "@/infrastructure/store/store-hooks";
import React, { lazy, Suspense } from "react";

const WorkDetailsForm = lazy(() => import("./WorkDetailsForm"));

const WorkDetails = () => {
  const isEditingWorkDetails = useAppSelector(
    (app) => app["personal-profile"].isEditingProfileDetails
  );
  const dispatch = useAppDispatch();

  return (
    <section className="bg-white border border-gray-blue-2 p-4 rounded-lg space-y-4 mb-[75px]">
      <div className="flex gap-2 items-end h-6">
        {!isEditingWorkDetails && (
          <button
            className="text-gray-blue-6 hover:text-gray-blue-9"
            onClick={() => dispatch(toggleEditWorkDetails(true))}>
            <EditIcon />
          </button>
        )}
        <h3 className="font-bold">Work Details</h3>
      </div>

      {!isEditingWorkDetails && (
        <div className="flex flex-col md:flex-row">
          <ul className="px-4 pb-4 gap-4 md:w-1/2">
            <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
              <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                Position
              </span>
              <span className="typography-body text-black flex-1">
                Senior Graphic Artist
              </span>
            </li>
            <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
              <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                Is Active?
              </span>
              <span className="typography-body text-black flex-1">
                Users Status
              </span>
            </li>
          </ul>
          <ul className="px-4 pb-4 gap-4 md:w-1/2">
            <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
              <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                Access Level
              </span>
              <span className="typography-body text-black flex-1">
                <Tag value="ADMIN" />
              </span>
            </li>
            <li className="space-x-1 items-end w-full flex odd:bg-blue-1 px-1 py-2">
              <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                Team ID
              </span>
              <span className="typography-body text-black flex-1">
                <Tag value="BROKER" />
              </span>
            </li>
          </ul>
        </div>
      )}

      <Suspense>{isEditingWorkDetails && <WorkDetailsForm />}</Suspense>

      {isEditingWorkDetails && (
        <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
          <div className="flex justify-between">
            <Button
              btnType="secondary-gray"
              onClick={() => dispatch(toggleEditWorkDetails(false))}>
              CANCEL
            </Button>
            <Button>SAVE</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkDetails;
