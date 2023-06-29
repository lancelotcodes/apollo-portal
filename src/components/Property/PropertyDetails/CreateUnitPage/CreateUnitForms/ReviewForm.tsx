import Button from '@/components/core/Button';
import UnitDetailsComponent from '@/components/core/UnitDetailsComponent';
import { SessionOptions } from '@/constant/SessionOptions';
import { FCC } from '@/helpers/FCC';
import { SessionUtils } from '@/helpers/session-storage';
import { useSelectedPropertyUnit } from '@/hooks/useSelectedPropertyUnit';
import { StepHelpers } from '@/hooks/useStep';
import { ChevronLeftIcon, DownloadIcon } from '@heroicons/react/solid';
import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewForm: FCC<StepHelpers> = ({ goToPrevStep }) => {
  const { propertyId, id } = useParams();
  const [unitId] = useState<number | undefined>(
    SessionUtils.getItem(SessionOptions.unitId) ? SessionUtils.getItem(SessionOptions.unitId) : undefined,
  );

  const navigate = useNavigate();

  // Custom hook to get building floor unit
  useSelectedPropertyUnit(id ? parseInt(id) : unitId);

  return (
    <div className="w-full flex-1 flex flex-col">
      <Suspense>
        <UnitDetailsComponent unitID={unitId} />
      </Suspense>

      <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
        <div className="flex justify-between">
          <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
            PREVIOUS STEP
          </Button>
          <Button
            className="ml-auto"
            btnType="secondary-gray"
            icon={<DownloadIcon className="h-6 w-5" />}
            onClick={() => {
              SessionUtils.removeItem(SessionOptions.unitNumber);
              SessionUtils.removeItem(SessionOptions.estimatedArea);
              SessionUtils.removeItem(SessionOptions.leaseTerm);
              SessionUtils.removeItem(SessionOptions.unitStatusName);
              navigate(`/property/${propertyId}`, {
                state: {
                  defaultTab: 'Stacking Plan',
                },
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
