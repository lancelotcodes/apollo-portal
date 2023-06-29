import Button from '@/components/core/Button';
import { SessionOptions } from '@/constant/SessionOptions';
import { isBuildingType } from '@/helpers/building';
import { SessionUtils } from '@/helpers/session-storage';
import {
  useDeletePropertyMutation,
  usePropertyConfirmMutation,
} from '@/infrastructure/store/api/property/property-api';
import {
  BuildingDetails,
  PropertyAddress,
  PropertyAgentsDetails,
  PropertyDocumentResponse,
  PropertyMandateResponse,
  PropertyResponse,
  PropertySEOResponse,
  PropertyVideoResponse,
  SavePropertyLocationRequest,
} from '@/infrastructure/store/api/property/property-type';
import { ChevronLeftIcon, DownloadIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { lazy, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HandleNotification } from '../ToastAlert';
// import BrokerDetailsContainer from './Accordions/AgentDetailAccordion';
import AuditDetailsAccordion from './Accordions/AuditDetailsAccordion';
import BuildingDetailsAccordionContainer from './Accordions/BuildingDetailAccordion';
import LocationDetailsAccordionContainer from './Accordions/LocationDetailAccordion';
import PropertyDetailAccordionContainer from './Accordions/PropertyDetailAccordion';
import PropertyMapAccordion from './Accordions/PropertyMapAccordion';
import ImageAccordionContainer from './Accordions/MediaDetailAccordion';
import { MapRef } from 'react-map-gl';
import Dialog from '../Dialog';
import { useDialogState } from '@/hooks/useDialogState';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import Loader from '../Loader';
import MandateDetailAccordionContainer from './Accordions/MandateDetailAccordion';

const BrokerDetailsContainer = lazy(
  () => import('@/components/core/PropertyDetailsComponent/Accordions/AgentDetailAccordion/index'),
);

interface Props {
  propertyInfo: PropertyResponse;
  property?: BuildingDetails | null | undefined;
  propertyAddress?: PropertyAddress | SavePropertyLocationRequest | null;
  propertyAgents?: PropertyAgentsDetails[] | null;
  propertySEO?: PropertySEOResponse | null | undefined;
  propertyVideo?: PropertyVideoResponse | null;
  propertyDocuments?: PropertyDocumentResponse[] | null;
  propertyMandate?: PropertyMandateResponse[] | null;
  isTabForm?: boolean | null | undefined;
  goToPrevStep?: () => void;
}

const PropertyDetailsComponent: React.FC<Props> = ({
  isTabForm,
  property,
  propertyAddress,
  propertyAgents,
  propertyInfo,
  propertySEO,
  propertyVideo,
  propertyDocuments,
  propertyMandate,
  goToPrevStep,
}) => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  SessionUtils.setItem('isBuilding', propertyInfo.propertyTypeName);
  const { selectedPropertyDetailsLoading } = useAppSelector((state) => state['property-list']);
  const propertyTypeName = SessionUtils.getItem('isBuilding');

  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);
  const [propertyId] = useState<number | undefined>(
    id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
        ? SessionUtils.getItem(SessionOptions.propertyId)
        : skipToken,
  );

  useEffect(() => {
    console.log(property);
  }, [propertyInfo, propertyTypeName, property, propertySEO]);
  const [saveConfirm] = usePropertyConfirmMutation();
  const onConfirmProperty = async () => {
    const res = await saveConfirm({ propertyID: propertyId }).unwrap();
    res.message && HandleNotification(res.message, res.success);
    navigate('/property');
  };
  const [deleteProperty] = useDeletePropertyMutation();
  const handleDeleteProperty = async () => {
    const res = await deleteProperty({ propertyID: propertyInfo?.id }).unwrap();
    res.message && HandleNotification(res.message, res.success);
    navigate('/property');
  };

  return (
    <div className="flex flex-col md:flex-row h-full overflow-auto md:overflow-hidden">
      {selectedPropertyDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="md:overflow-auto px-2 py-4 pb-2 md:pb-4 w-full space-y-4 md:mb-[72px] md:flex-1">
            <PropertyDetailAccordionContainer isTabForm={isTabForm} property={propertyInfo} />

            {isBuildingType(propertyTypeName) && (
              <BuildingDetailsAccordionContainer isTabForm={isTabForm} propertyBuilding={property} />
            )}

            <LocationDetailsAccordionContainer
              isTabForm={isTabForm}
              propertyLocation={propertyAddress}
              passedRef={mapRef}
            />

            <ImageAccordionContainer
              isTabForm={isTabForm}
              propertyVideo={propertyVideo}
              propertyDocuments={propertyDocuments}
            />
            <MandateDetailAccordionContainer
              isTabForm={isTabForm}
              propertyMandate={propertyMandate}
            />

            {/* <DocumentsAccordion isTabForm={isTabForm} propertyMandate={propertyMandate} />

        <VideoAccordion isTabForm={isTabForm} propertyVideo={propertyVideo} /> */}

            {isTabForm && (
              <AuditDetailsAccordion
                isTabForm={isTabForm}
                propertySEO={propertySEO}
              />
            )}
          </div>
          <div className="md:overflow-auto pb-20 md:flex-1 px-2 py-4 pt-2 md:pt-4 space-y-4">
            <BrokerDetailsContainer isTabForm={isTabForm} agents={propertyAgents} />
            {propertyInfo && (
              <PropertyMapAccordion property={propertyInfo} propertyAddress={propertyAddress} passedRef={mapRef} />
            )}
          </div>
          {!isTabForm && (
            <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex justify-between">
                <Button
                  btnType="link"
                  type="button"
                  onClick={goToPrevStep}
                  icon={<ChevronLeftIcon className="h-6 w-5" />}
                >
                  PREVIOUS STEP
                </Button>
                <Button
                  className="ml-auto"
                  onClick={onConfirmProperty}
                  btnType="secondary-gray"
                  icon={<DownloadIcon className="h-6 w-5" />}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
          {isTabForm && (
            <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex justify-between">
                <Button
                  btnType="link"
                  className="text-red hover:text-opacity-90 hover:text-red"
                  onClick={setOpenDialog}
                >
                  DELETE PROPERTY
                </Button>
                <Dialog
                  size="md"
                  className="px-6 pt-5 pb-6"
                  closeDialog={setCloseDialog}
                  modalState={isOpen}
                  title="Delete Property"
                >
                  <div className="text-start">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this item?
                    </h3>
                    <div className="flex justify-end mt-4">
                      <Button
                        type="button"
                        className="ml-2 leading-3 px-10 bg-gray-2 text-gray-800 border-2 border-blue-5 hover:bg-gray-2 focus:bg-gray-2 focus:border-gray-2 hover:border-gray-2"
                        onClick={() => setCloseDialog()}
                      >
                        {'No'}
                      </Button>
                      <Button
                        type="submit"
                        className="ml-2 leading-3 px-10 bg-blue focus:bg-red active:bg-red hover:bg-red"
                        onClick={handleDeleteProperty}
                      >
                        {'Yes'}
                      </Button>
                    </div>
                  </div>
                </Dialog>
                <div className="flex gap-4">
                  <Button btnType="secondary-gray">UNPUBLISH PROPPERTY</Button>
                  <Button>VISIT ON WEBSITE</Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyDetailsComponent;
