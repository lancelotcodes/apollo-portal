import Button from '@/components/core/Button';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import React, { useState } from 'react';
import Broker from '../../../Broker';

interface Props {
  agents: PropertyAgentsDetails[] | undefined;
}

const BrokerDetails: React.FC<Props> = ({ agents }) => {
  const [additionalAgent, setAdditionalAgent] = useState<boolean>(false);
  return (
    <React.Fragment>
      <div className="mt-2 space-y-4">
        {agents &&
          agents?.map((agent, index) => {
            if (index < 1) {
              return (
                <div className="mb-2" key={index}>
                  <Broker agent={agent} />
                </div>
              );
            } else if (index >= 1 && additionalAgent === true) {
              return (
                <div className="mb-2" key={index}>
                  <Broker agent={agent} />
                </div>
              );
            }
          })}
        {agents && agents?.length > 1 && !additionalAgent && (
          <div className="w-full flex">
            <Button className="w-full" btnType="link" onClick={() => setAdditionalAgent(true)}>
              OPEN ADDITIONAL AGENT + {agents?.length && agents?.length - 1}
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
        {agents && agents?.length === 0 && <p>{InfoMessages.DataNotFound}</p>}
      </div>
    </React.Fragment>
  );
};

export default BrokerDetails;

<div className="border border-gray-blue-2 rounded-lg bg-white p-4 space-y-2">
  <p className="flex justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 typography-button">
    BROKER DETAILS
  </p>

  <div>
    <p className="typography-label font-medium">Main Broker</p>
    <Broker name="Aaron Ramos" />
  </div>

  <div className="w-full flex">
    <Button className="w-full" btnType="link">
      OPEN ADDITIONAL BROKER +3
    </Button>
  </div>
</div>;
