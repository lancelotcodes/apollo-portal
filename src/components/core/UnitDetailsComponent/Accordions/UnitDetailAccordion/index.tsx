import React, { useState } from 'react';
import { classNames } from '@/helpers/classNames';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import Accordion from '@/components/core/Accordion';
import UnitDetailsAccordion from './UnitDetailsAccordion';
import { BuildingUnitById, UnitRequest } from '@/infrastructure/store/api/stacking/stacking-types';
import UnitDetailsForm from '@/components/Property/PropertyDetails/CreateUnitPage/CreateUnitForms/UnitDetailsForm/UnitDetailsForm';
import { HandleNotification } from '@/components/core/ToastAlert';
import {
  // useBuildingFloorUnitByIdQuery,
  useFloorsByBuildingIdQuery,
  useSaveUnitMutation,
} from '@/infrastructure/store/api/stacking/stacking-api';
import {
  useUnitAvailabilityQuery,
  useUnitHandOverConditionQuery,
  useUnitListingTypeQuery,
  useUnitStatusQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import { SubmitHandler } from 'react-hook-form';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/core/Loader';
import { InfoMessages } from '@/constant/InfoMessageOptions';
interface Props {
  propertyID?: number;
  buildingId?: number;
  unitDetails?: BuildingUnitById;
  IsUnitTabForm?: boolean;
}

const UnitDetailAccordionContainer: React.FC<Props> = ({ propertyID, buildingId, unitDetails, IsUnitTabForm }) => {
  const [unitDetailsForm, setUnitDetailsForm] = useState<boolean>(false);

  const [saveUnit] = useSaveUnitMutation();

  const { data: unitStatus, isLoading: isStatusLoading } = useUnitStatusQuery(null);
  const { data: unitAvailability, isLoading: isAvailabilityLoading } = useUnitAvailabilityQuery(null);
  const { data: unitListingType, isLoading: isListingTypeLoading } = useUnitListingTypeQuery(null);
  const { data: unitHandOverCondition, isLoading: isHandoverConditionLoading } = useUnitHandOverConditionQuery(null);
  const { data: buildingFloors, isLoading: isBuildingFloorLoading } = useFloorsByBuildingIdQuery(
    { Id: buildingId } ?? skipToken,
  );
  // const { data: buildingUnitDetails, isLoading: isBuildingUnitDetailsLoading } = useBuildingFloorUnitByIdQuery(
  //   propertyID ?? skipToken,
  // );
  const onSubmitUnitDetails: SubmitHandler<UnitRequest> = async (e) => {
    if (propertyID) {
      const res = await saveUnit({
        ...e,
        floorID: e?.floorID,
        propertyID: propertyID,
        cusa: Number(e?.cusa),
        basePrice: Number(e?.basePrice),
        escalationRate: Number(e?.escalationRate),
        minimumLeaseTerm: Number(e?.minimumLeaseTerm),
        parkingRent: Number(e?.parkingRent),
      }).unwrap();
      setUnitDetailsForm(false);
      res && res?.message && HandleNotification(res.message, res.success);
    }
  };

  const handleUnitDetailsTab = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setUnitDetailsForm(true);
    } else {
      setUnitDetailsForm(!unitDetailsForm);
      event?.stopPropagation();
    }
  };
  const loading =
    isStatusLoading ||
    isAvailabilityLoading ||
    isListingTypeLoading ||
    isHandoverConditionLoading ||
    isBuildingFloorLoading;
  // isBuildingUnitDetailsLoading;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {IsUnitTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleUnitDetailsTab(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform', !open)}
                />
              )}
              UNIT DETAILS
            </div>
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        {unitDetailsForm && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <UnitDetailsForm
                onSubmitUnitDetails={onSubmitUnitDetails}
                status={unitStatus?.data}
                availability={unitAvailability?.data}
                listingType={unitListingType?.data}
                handOverCondition={unitHandOverCondition?.data}
                buildingFloors={buildingFloors?.data}
                buildingUnitDetails={unitDetails}
                IsUnitTabForm={IsUnitTabForm}
                cardBorderClass="pt-0"
                cardColOneClass="md:w-full"
                cardColTwoClass="md:w-full"
              />
            )}
          </>
        )}
        {!unitDetailsForm && unitDetails && <UnitDetailsAccordion unitDetails={unitDetails} />}
        {!unitDetailsForm && unitDetails === null && <p className="mt-2 px-4 pb-4">{InfoMessages.DataNotFound}</p>}
      </Accordion>
    </div>
  );
};

export default UnitDetailAccordionContainer;
