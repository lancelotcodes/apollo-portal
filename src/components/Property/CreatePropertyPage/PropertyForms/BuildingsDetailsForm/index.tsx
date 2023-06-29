import React from 'react';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import { useOwnerShipTypeListQuery, useProjectStatusListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import BuildingDetailsForm from './BuildingsForm';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import { useParams } from 'react-router-dom';
import {
  useBuildingByIDQuery,
  useSavePropertyBuildingMutation,
} from '@/infrastructure/store/api/property/property-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { SubmitHandler } from 'react-hook-form';
import { SavePropertyBuildingRequest } from '@/infrastructure/store/api/property/property-type';

const BuildingDetailsFormContainer: FCC<StepHelpers> = ({ goToNextStep, goToPrevStep }) => {
  const { id } = useParams();
  const {
    data: buildingInfo,
    isLoading: isBuildingLoading,
    isFetching,
  } = useBuildingByIDQuery(
    id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : skipToken,
  );

  const { data: ownershipList, isLoading: isOwnShipLoading } = useOwnerShipTypeListQuery(null);
  const { data: projectStatusList, isLoading: isProjectStatusLoading } = useProjectStatusListQuery(null);
  const [saveBuilding] = useSavePropertyBuildingMutation();

  const onSubmit: SubmitHandler<SavePropertyBuildingRequest> = async (e) => {
    const propertyId = id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : undefined;
    if (propertyId) {
      const res = await saveBuilding({ ...e, propertyID: propertyId }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep4: true }));
    goToNextStep();
  };

  // Query IsLoading true
  const loading = isBuildingLoading || isFetching || isOwnShipLoading || isProjectStatusLoading;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BuildingDetailsForm
          initialValue={buildingInfo?.data}
          owners={ownershipList?.data}
          projectStatus={projectStatusList?.data}
          onSubmit={onSubmit}
          goToNextStep={goToNextStep}
          goToPrevStep={goToPrevStep}
          inputClassName="py-1"
          formColClassName="md:divide-x md:space-x-4"
          formColInnerClassName="md:w-full md:pl-4 space-y-4"
        />
      )}
    </>
  );
};

export default BuildingDetailsFormContainer;
