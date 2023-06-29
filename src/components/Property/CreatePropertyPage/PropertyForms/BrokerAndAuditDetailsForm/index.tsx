import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { SessionOptions } from '@/constant/SessionOptions';
import { FCC } from '@/helpers/FCC';
import { SessionUtils } from '@/helpers/session-storage';
import { StepHelpers } from '@/hooks/useStep';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import {
  useAgentListQuery,
  useAgentsByPropertyIDQuery,
  usePropertyMandateByIDQuery,
  useSavePropertyAgentMutation,
  useSavePropertyMandateMutation,
} from '@/infrastructure/store/api/property/property-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrokerAndAuditForm from './BrokerAndAuditForm';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { PropertyMandateRequest } from '@/infrastructure/store/api/property/property-type';
const BrokerAndAuditFormContainer: FCC<StepHelpers> = ({ goToNextStep, goToPrevStep }) => {
  const { id } = useParams();
  const { setValue, reset } = useForm();
  const [propertyID] = useState<number | undefined>(
    id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : skipToken,
  );

  const {
    data: propertyAgents,
    isLoading: isAgentLoading,
    isFetching: isAgentFetching,
  } = useAgentsByPropertyIDQuery(propertyID);
  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);
  const {
    data: mandateInfo,
    isLoading: isMandateLoading,
    isSuccess: isMandateSuccess,
    isFetching: isMandateFetching,
  } = usePropertyMandateByIDQuery(propertyID ?? skipToken);

  const [saveAgent] = useSavePropertyAgentMutation();
  const [saveMandate] = useSavePropertyMandateMutation();

  const [attachmentId, setAttachmentId] = useState<number | undefined>(
    mandateInfo && mandateInfo.data && mandateInfo.data.length > 0 && mandateInfo.data[0].attachmentId
      ? mandateInfo?.data[0].attachmentId
      : undefined,
  );
  const [mandateFiles, setMandateFiles] = useState<FileResponse[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const handleOnSubmitAgent: SubmitHandler<FieldValues> = async (e) => {
    const agentObj = {
      propertyID: propertyID,
      agents: [
        {
          agentID: e.agentID,
          isVisibleOnWeb: e.isVisibleOnWeb,
          agentType: e.agentType,
        },
      ],
    };
    setValue('agentName', 0);
    reset({
      agentName: undefined,
      agentType: undefined,
      isVisibleOnWeb: null,
    });
    if (propertyID) {
      const res = await saveAgent(agentObj).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

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

  const handleGoToNextStep = () => {
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep5: true }));
    goToNextStep();
  };

  useEffect(() => {
    // Reset default value in the uploader (Mandate form)
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
  }, [isMandateSuccess, mandateInfo?.data, setValue]);

  // Query IsLoading true
  const loading = isAgentLoading || isAgentListLoading || isAgentFetching || isMandateLoading || isMandateFetching;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrokerAndAuditForm
          initialValue={propertyAgents?.data}
          agents={agentList?.data}
          handleOnSubmitAgent={handleOnSubmitAgent}
          goToPrevStep={goToPrevStep}
          formContainerClass="space-x-4"
          formRowClassName="lg:flex-row lg:space-x-4"
          formColClassName="w-full"
          handleMandateOnSubmit={handleMandateOnSubmit}
          setAttachmentId={setAttachmentId}
          mandateInfo={mandateInfo?.data && mandateInfo?.data[0]}
          mandateFiles={mandateFiles}
          setMandateFiles={setMandateFiles}
          handleGoToNextStep={handleGoToNextStep}
          imageError={imageError}
        />
      )}
    </>
  );
};

export default BrokerAndAuditFormContainer;
