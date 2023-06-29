import { InfoMessages } from '@/constant/InfoMessageOptions';
import { PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import React, { useState } from 'react';
import Broker from '../../../Broker';
import Button from '../../../Button';

interface Props {
  agents: PropertyAgentsDetails[];
}

const LeaseContractAccordion: React.FC<Props> = ({ agents }) => {
  const [additionalAgent, setAdditionalAgent] = useState<boolean>(false);
  return (
    <div className="p-4">
      <p className="flex justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 typography-button">
        AGENT DETAILS
      </p>
      {agents?.length === 0 && <p className="mt-2">{InfoMessages.DataNotFound}</p>}
      <div>
        {agents?.map((agent, index) => {
          if (index < 1) {
            return (
              <div className="mb-2" key={agent.id}>
                <Broker agent={agent} />
              </div>
            );
          } else if (index >= 1 && additionalAgent === true) {
            return (
              <div className="mb-2" key={agent.id}>
                <Broker agent={agent} />
              </div>
            );
          }
        })}
      </div>
      {agents && agents?.length > 1 && !additionalAgent && (
        <div className="w-full flex">
          <Button className="w-full" btnType="link" onClick={() => setAdditionalAgent(true)}>
            OPEN ADDITIONAL AGENT + {agents && agents?.length - 1}
          </Button>
        </div>
      )}
      {additionalAgent && (
        <div className="w-full flex">
          <Button className="w-full" btnType="link" onClick={() => setAdditionalAgent(false)}>
            Hide
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeaseContractAccordion;
