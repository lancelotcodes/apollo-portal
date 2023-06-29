import React, { useState } from 'react';
import AgentForm from '@/components/Property/CreatePropertyPage/PropertyForms/BrokerAndAuditDetailsForm/MandateForm/AgentForm';
import Button from '@/components/core/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { AgentDetails, PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Broker from '@/components/core/Broker';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { classNames } from '@/helpers/classNames';

export interface Props {
  handleOnSubmitAgent: SubmitHandler<FieldValues>;
  initialValue: PropertyAgentsDetails[] | undefined;
  agents: AgentDetails[] | undefined;
  goToPrevStep?: () => void;
  goToNextUnitStep?: (() => void) | undefined;
  IsUnitTabForm?: boolean;
  cardWithClass?: string;
  cardBorderClass?: string;
}

const LeaseContactForm: React.FC<Props> = ({
  handleOnSubmitAgent,
  initialValue,
  agents,
  goToPrevStep,
  goToNextUnitStep,
  IsUnitTabForm,
  cardWithClass,
  cardBorderClass,
}) => {
  const [additionalAgent, setAdditionalAgent] = useState<boolean>(false);
  const [addAgent, setAddAgent] = useState<boolean>(IsUnitTabForm ? false : true);
  const [defaultAgent, setDefaultAgent] = useState<PropertyAgentsDetails | undefined>(undefined);

  const handleDefaultAgent = (agent: PropertyAgentsDetails) => {
    setDefaultAgent(agent);
    setAddAgent(true);
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full">
          <div className={classNames('flex flex-col lg:w-1/2 space-y-4', cardWithClass)}>
            <div className={classNames('p-4', cardBorderClass)}>
              <AgentForm
                agents={agents}
                initialValue={defaultAgent}
                handleOnSubmitAgent={handleOnSubmitAgent}
                isStepForm={IsUnitTabForm}
                addAgent={addAgent}
                setAddAgent={setAddAgent}
              />
              <h3 className="font-bold mb-4 space-y-4 mt-1">{'Agent Listing'}</h3>
              {initialValue &&
                initialValue?.map((agent, index) => {
                  if (index < 1) {
                    return (
                      <div className="mb-2" key={index}>
                        <Broker agent={agent} handleDefaultAgent={handleDefaultAgent} />
                      </div>
                    );
                  } else if (index >= 1 && additionalAgent === true) {
                    return (
                      <div className="mb-2" key={index}>
                        <Broker agent={agent} handleDefaultAgent={handleDefaultAgent} />
                      </div>
                    );
                  }
                })}
              {initialValue && initialValue?.length > 1 && !additionalAgent && (
                <div className="w-full flex">
                  <Button className="w-full" btnType="link" onClick={() => setAdditionalAgent(true)}>
                    OPEN ADDITIONAL AGENT + {initialValue && initialValue.length - 1}
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
              {initialValue && initialValue?.length === 0 && <p>{InfoMessages.DataNotFound}</p>}
            </div>
          </div>
        </div>
      </section>
      {!IsUnitTabForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex justify-between">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            <Button
              className="ml-auto"
              type="button"
              onClick={goToNextUnitStep}
              suffix={<ChevronRightIcon className="h-6 w-5" />}
            >
              NEXT STEP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseContactForm;
