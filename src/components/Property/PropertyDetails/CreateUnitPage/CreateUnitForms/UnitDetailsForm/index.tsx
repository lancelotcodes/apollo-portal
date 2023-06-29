import React, { useState } from 'react';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import {
  useUnitAvailabilityQuery,
  useUnitHandOverConditionQuery,
  useUnitListingTypeQuery,
  useUnitStatusQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import UnitDetailsForm from './UnitDetailsForm';
import {
  useBuildingFloorUnitByIdQuery,
  useFloorsByBuildingIdQuery,
  useSaveUnitMutation,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import { useParams } from 'react-router-dom';
import Loader from '@/components/core/Loader';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { UnitRequest } from '@/infrastructure/store/api/stacking/stacking-types';
import { SubmitHandler } from 'react-hook-form';

const UnitDetailsFormContainer: FCC<StepHelpers> = ({ goToNextUnitStep }) => {
  const params = useParams();
  const [unitId] = useState<number | undefined>(
    params.id
      ? parseInt(params.id)
      : SessionUtils.getItem(SessionOptions.unitId)
      ? SessionUtils.getItem(SessionOptions.unitId)
      : undefined,
  );

  const buildingId = SessionUtils.getItem(SessionOptions.buildingId);
  const [saveUnit] = useSaveUnitMutation();

  const { data: unitStatus, isLoading: isStatusLoading } = useUnitStatusQuery(null);
  const { data: unitAvailability, isLoading: isAvailabilityLoading } = useUnitAvailabilityQuery(null);
  const { data: unitListingType, isLoading: isListingTypeLoading } = useUnitListingTypeQuery(null);
  const { data: unitHandOverCondition, isLoading: isHandoverConditionLoading } = useUnitHandOverConditionQuery(null);
  const { data: buildingFloors, isLoading: isBuildingFloorLoading } = useFloorsByBuildingIdQuery(
    { Id: buildingId } ?? skipToken,
  );
  const { data: buildingUnitDetails, isLoading: isBuildingUnitDetailsLoading } = useBuildingFloorUnitByIdQuery(
    unitId ?? skipToken,
  );

  SessionUtils.setItem(SessionOptions.propertyId, buildingUnitDetails?.data?.propertyID);

  const onSubmitUnitDetails: SubmitHandler<UnitRequest> = async (e) => {
    const res = await saveUnit({
      ...e,
      floorID: e?.floorID,
      propertyID: buildingUnitDetails?.data?.propertyID ? buildingUnitDetails.data.propertyID : 0,
      cusa: Number(e.cusa),
      basePrice: Number(e.basePrice),
      escalationRate: Number(e.escalationRate),
      minimumLeaseTerm: Number(e.minimumLeaseTerm),
      parkingRent: Number(e.parkingRent),
    }).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
    SessionUtils.setItem(SessionOptions.unitId, res.data.entityId);
    goToNextUnitStep();
  };

  // Query IsLoading true
  const loading =
    isStatusLoading ||
    isAvailabilityLoading ||
    isListingTypeLoading ||
    isHandoverConditionLoading ||
    isBuildingFloorLoading ||
    isBuildingUnitDetailsLoading;

  return (
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
          buildingUnitDetails={buildingUnitDetails?.data}
          cardBorderClass="md:px-8 bg-white border border-gray-blue-2"
          cardRowClass="md:flex-row md:divide-x md:space-y-0 md:space-x-4"
          cardColOneClass="md:w-1/2"
          cardColTwoClass="md:w-1/2 md:pl-4"
        />
      )}
    </>
  );
};

export default UnitDetailsFormContainer;
