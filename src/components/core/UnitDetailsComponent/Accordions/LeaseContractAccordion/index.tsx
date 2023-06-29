import React, { useState } from 'react';
import { classNames } from '@/helpers/classNames';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';

import Accordion from '@/components/core/Accordion';
import LeaseContractAccordion from './LeaseContractAccordion';
import LeaseContactForm from '@/components/Property/PropertyDetails/CreateUnitPage/CreateUnitForms/LeaseContactForm/LeaseContactForm';
import {
  useAgentListQuery,
  useAgentsByPropertyIDQuery,
  useSavePropertyAgentMutation,
} from '@/infrastructure/store/api/property/property-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Loader from '@/components/core/Loader';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface Props {
  propertyID?: number;
  IsUnitTabForm?: boolean;
}

const LeaseContractAccordionContainer: React.FC<Props> = ({ propertyID, IsUnitTabForm }) => {
  const [leaseContractDetailsForm, setLeaseContractDetailsForm] = useState<boolean>(false);
  const handleLeaseContractDetailsTab = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setLeaseContractDetailsForm(true);
    } else {
      setLeaseContractDetailsForm(!leaseContractDetailsForm);
      event?.stopPropagation();
    }
  };
  const { setValue, reset } = useForm();
  const [saveAgent] = useSavePropertyAgentMutation();
  const {
    data: agents,
    isLoading: isAgentLoading,
    isFetching: isAgentFetching,
  } = useAgentsByPropertyIDQuery(propertyID ?? skipToken);
  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);

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

  const loading = isAgentLoading || isAgentFetching || isAgentListLoading;

  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        defaultOpen
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {IsUnitTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleLeaseContractDetailsTab(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform', !open)}
                />
              )}
              AGENT DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {leaseContractDetailsForm && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <LeaseContactForm
                handleOnSubmitAgent={handleOnSubmitAgent}
                agents={agentList?.data}
                initialValue={agents?.data}
                cardWithClass="lg:w-full"
                IsUnitTabForm={IsUnitTabForm}
              />
            )}
          </>
        )}
        {!leaseContractDetailsForm && agents && <LeaseContractAccordion agents={agents?.data} />}
      </Accordion>
    </div>
  );
};

export default LeaseContractAccordionContainer;
