import React, { useState } from 'react';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import {
  useAgentListQuery,
  useAgentsByPropertyIDQuery,
  useSavePropertyAgentMutation,
} from '@/infrastructure/store/api/property/property-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import Loader from '@/components/core/Loader';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import LeaseContactForm from './LeaseContactForm';

const LeaseContactFormContainer: FCC<StepHelpers> = ({ goToNextUnitStep, goToPrevStep }) => {
  const { setValue, reset } = useForm();
  const [propertyId] = useState<number | undefined>(
    SessionUtils.getItem(SessionOptions.propertyId) ? SessionUtils.getItem(SessionOptions.propertyId) : undefined,
  );

  const [saveAgent] = useSavePropertyAgentMutation();
  const {
    data: agents,
    isLoading: isAgentLoading,
    isFetching: isAgentFetching,
  } = useAgentsByPropertyIDQuery(propertyId);
  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);

  const handleOnSubmitAgent: SubmitHandler<FieldValues> = async (e) => {
    const agentObj = {
      propertyID: propertyId,
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
    if (propertyId) {
      const res = await saveAgent(agentObj).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

  // Query IsLoading true
  const loading = isAgentLoading || isAgentFetching || isAgentListLoading;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LeaseContactForm
          handleOnSubmitAgent={handleOnSubmitAgent}
          agents={agentList?.data}
          initialValue={agents?.data}
          goToPrevStep={goToPrevStep}
          goToNextUnitStep={goToNextUnitStep}
          cardBorderClass="md:px-8 rounded-lg bg-white border border-gray-blue-2"
        />
      )}
    </>
  );
};

export default LeaseContactFormContainer;
