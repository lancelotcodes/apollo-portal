import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import BuildingDetailsForm from '@/components/Property/CreatePropertyPage/PropertyForms/BuildingsDetailsForm/BuildingsForm';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { classNames } from '@/helpers/classNames';
import { useOwnerShipTypeListQuery, useProjectStatusListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import {
  useBuildingByIDQuery,
  useSavePropertyBuildingMutation,
} from '@/infrastructure/store/api/property/property-api';
import { BuildingDetails, SavePropertyBuildingRequest } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../../../Accordion';
import BuildingDetailsAccordion from './BuildingDetailsAccordion';
import { SubmitHandler } from 'react-hook-form';

interface Props {
  propertyBuilding?: BuildingDetails | null;
  isTabForm?: boolean | null | undefined;
}

const BuildingDetailsAccordionContainer: React.FC<Props> = ({ propertyBuilding, isTabForm }) => {
  const [propertyForm, setPropertyForm] = useState<boolean>(false);
  const handleTabPropertyForm = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertyForm(!propertyForm);
    } else {
      setPropertyForm(!propertyForm);
      event?.stopPropagation();
    }
  };

  const { propertyId } = useParams();
  const [propertyID] = useState<number | undefined>(propertyId ? parseInt(propertyId) : undefined);
  const {
    data: buildingInfo,
    isLoading: isBuildingLoading,
    isFetching,
  } = useBuildingByIDQuery(propertyID ?? skipToken);
  const { data: ownershipList } = useOwnerShipTypeListQuery(null);
  const { data: projectStatusList } = useProjectStatusListQuery(null);
  const [saveBuilding] = useSavePropertyBuildingMutation();

  const onSubmit: SubmitHandler<SavePropertyBuildingRequest> = async (e) => {
    if (propertyId) {
      const res = await saveBuilding({ ...e, propertyID: propertyId }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
    setPropertyForm(!propertyForm);
  };
  const loading = isBuildingLoading || isFetching;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(event) => handleTabPropertyForm(event, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform')}
                />
              )}
              BUILDING DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {isTabForm && propertyForm && (
          <>
            {loading ? (
              <div className="flex justify-center h-screen">
                <Loader />
              </div>
            ) : (
              <BuildingDetailsForm
                initialValue={buildingInfo?.data}
                owners={ownershipList?.data}
                projectStatus={projectStatusList?.data}
                onSubmit={onSubmit}
                isStepForm={true}
                formColClassName="md:flex-col md:space-x-0 md:divide-x-0"
                formColInnerClassName="md:w-full md:pl-0"
                formCardBorderClassName="border-0 p-0 md:px-0"
                inputClassName="py-1"
                handleTabPropertyForm={handleTabPropertyForm}
              />
            )}
          </>
        )}
        {!propertyForm && propertyBuilding && propertyBuilding !== null && (
          <BuildingDetailsAccordion {...propertyBuilding} />
        )}
        {!propertyBuilding && propertyBuilding === null && (
          <p className="mt-2 px-4 pb-4">{InfoMessages.DataNotFound}</p>
        )}
      </Accordion>
    </div>
  );
};

export default BuildingDetailsAccordionContainer;
