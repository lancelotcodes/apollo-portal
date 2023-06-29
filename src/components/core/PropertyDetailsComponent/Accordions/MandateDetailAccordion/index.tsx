import React, { useEffect, useState } from 'react';
import { classNames } from '@/helpers/classNames';
import { PropertyMandateRequest, PropertyMandateResponse } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import Accordion from '@/components/core/Accordion';
import {
  usePropertyMandateByIDQuery,
  useSavePropertyMandateMutation,
} from '@/infrastructure/store/api/property/property-api';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { SubmitHandler } from 'react-hook-form';
import MandateForm from '@/components/Property/CreatePropertyPage/PropertyForms/BrokerAndAuditDetailsForm/MandateForm/MandateForm';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { SessionUtils } from '@/helpers/session-storage';
import MandateDetails from './MandateDetails';

interface Props {
  propertyMandate?: PropertyMandateResponse[] | null;
  isTabForm?: boolean | null | undefined;
}
const MandateDetailAccordionContainer: React.FC<Props> = ({ propertyMandate, isTabForm }) => {
  const { propertyId } = useParams();
  const [propertyID] = useState<number | undefined>(propertyId ? parseInt(propertyId) : undefined);
  const [propertyMandateForm, setPropertyMandateForm] = React.useState<boolean>(false);
  const handleTabPropertyForm = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertyMandateForm(!propertyMandateForm);
    } else {
      setPropertyMandateForm(!propertyMandateForm);
      event?.stopPropagation();
    }
  };

  const [saveMandate] = useSavePropertyMandateMutation();
  const {
    data: mandateInfo,
    isLoading: isMandateLoading,
    isSuccess: isMandateSuccess,
    isFetching: isMandateFetching,
  } = usePropertyMandateByIDQuery(propertyID ?? skipToken);
  const [attachmentId, setAttachmentId] = useState<number | undefined>(
    mandateInfo && mandateInfo.data && mandateInfo.data.length > 0 && mandateInfo.data[0].attachmentId
      ? mandateInfo?.data[0].attachmentId
      : undefined,
  );
  const [mandateFiles, setMandateFiles] = useState<FileResponse[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const handleMandateOnSubmit: SubmitHandler<PropertyMandateRequest> = async (e) => {
    (attachmentId || mandateInfo?.data?.length === 0) && setImageError('File is required!');
    if (propertyID && (attachmentId || mandateInfo?.data[0].attachmentId)) {
      const res = await saveMandate([
        { ...e, propertyID: propertyID, attachmentId: attachmentId ? attachmentId : mandateInfo?.data[0].attachmentId },
      ]).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep5: true }));
  };

  useEffect(() => {
    if (isMandateSuccess && mandateInfo?.data.length > 0) {
      setMandateFiles([
        {
          id: mandateInfo?.data[0].attachmentId,
          documentName: mandateInfo?.data[0].attachmentName,
          documentSize: 0,
          documentPath: mandateInfo?.data[0].attachmentURL,
        },
      ]);
    }
  }, [isMandateSuccess, mandateInfo?.data]);

  const loading = isMandateLoading || isMandateFetching;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleTabPropertyForm(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform')}
                />
              )}
              MANDATE DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {propertyMandateForm && (
          <>
            {isTabForm && loading ? (
              <div className="flex justify-center h-screen">
                <Loader />
              </div>
            ) : (
              <>
                <div className={`px-4 rounded-lg border-gray-blue-2 md:px-4 mb-5`}>
                  <MandateForm
                    handleMandateOnSubmit={handleMandateOnSubmit}
                    setAttachmentId={setAttachmentId}
                    mandateInfo={mandateInfo?.data && mandateInfo?.data[0]}
                    mandateFiles={mandateFiles}
                    setMandateFiles={setMandateFiles}
                    imageError={imageError}
                    inputClassName="py-1"
                  />
                </div>
              </>
            )}
          </>
        )}
        {!propertyMandateForm && propertyMandate && <MandateDetails propertyMandate={propertyMandate} />}
      </Accordion>
    </div>
  );
};

export default MandateDetailAccordionContainer;
