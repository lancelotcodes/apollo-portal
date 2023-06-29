import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { classNames } from '@/helpers/classNames';
import {
  useAgentListQuery,
  useAgentsByPropertyIDQuery,
  useSavePropertyAgentMutation,
} from '@/infrastructure/store/api/property/property-api';
import { PencilAltIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BrokerDetails from './BrokerDetails';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import AgentForm from '@/components/Property/CreatePropertyPage/PropertyForms/BrokerAndAuditDetailsForm/MandateForm/AgentForm';
import Broker from '@/components/core/Broker';
// import Broker from '../../Broker';

interface Props {
  agents?: PropertyAgentsDetails[] | null;
  isTabForm?: boolean | null | undefined;
}

const BrokerDetailsContainer: React.FC<Props> = ({ agents, isTabForm }) => {
  const [propertyAgentForm, setPropertyAgentForm] = useState<boolean>(false);
  const { propertyId } = useParams();
  const [propertyID] = useState<number | undefined>(propertyId ? parseInt(propertyId) : undefined);

  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);
  const [saveAgent] = useSavePropertyAgentMutation();
  const {
    data: propertyAgents,
    isLoading: isAgentLoading,
    isFetching: isAgentFetching,
  } = useAgentsByPropertyIDQuery(propertyID ?? skipToken);

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
    if (propertyID) {
      const res = await saveAgent(agentObj).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

  const loading = isAgentLoading || isAgentListLoading || isAgentFetching;
  const handleTabAgentForm = (
    e: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertyAgentForm(!propertyAgentForm);
    } else {
      setPropertyAgentForm(!propertyAgentForm);
      e?.stopPropagation();
    }
  };

  const [defaultAgent, setDefaultAgent] = useState<PropertyAgentsDetails | undefined>(undefined);
  const [addAgent, setAddAgent] = useState<boolean>(false);
  const handleDefaultAgent = (agent: PropertyAgentsDetails) => {
    setDefaultAgent(agent);
    setAddAgent(true);
  };
  return (
    <>
      <div className="border border-gray-blue-2 rounded-lg bg-white p-4 space-y-2">
        <p className="flex justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 typography-button">
          <div className="flex">
            {isTabForm && (
              <PencilAltIcon onClick={(e) => handleTabAgentForm(e, 'show')} className={classNames('h-5 w-5 mr-2')} />
            )}
            AGENT DETAILS
          </div>
        </p>
        <div>
          {isTabForm && propertyAgentForm && (
            <>
              {loading ? (
                <div className="flex justify-center h-screen">
                  <Loader />
                </div>
              ) : (
                <div className={`rounded-lg border-gray-blue-2 px:2`}>
                  <AgentForm
                    initialValue={defaultAgent}
                    agents={agentList?.data}
                    handleOnSubmitAgent={handleOnSubmitAgent}
                    isStepForm={true}
                    addAgent={addAgent}
                    setAddAgent={setAddAgent}
                  />
                  {/* <hr className="mt-6" /> */}
                  <h3 className="font-bold mb-4 space-y-4 mt-1">{'Agent Listing'}</h3>
                  {propertyAgents?.data &&
                    propertyAgents?.data?.map((agent, index) => {
                      return (
                        <div className="mb-2" key={index}>
                          <Broker agent={agent} handleDefaultAgent={handleDefaultAgent} />
                        </div>
                      );
                    })}
                  {propertyAgents?.data && propertyAgents?.data?.length === 0 && <p>{InfoMessages.DataNotFound}</p>}
                </div>
              )}
            </>
          )}
          <div className="mt-4 space-y-4">
            {!propertyAgentForm && agents && <BrokerDetails agents={agents} />}
            {!agents && <p className="mt-2 px-4 pb-4">{InfoMessages.DataNotFound}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrokerDetailsContainer;
