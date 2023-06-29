import React, { useState } from 'react';
import Button from '@/components/core/Button';
import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import {
  AgentDetails,
  PropertyAgentsDetails,
  PropertyMandateRequest,
  PropertyMandateResponse,
} from '@/infrastructure/store/api/property/property-type';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import AgentForm from './MandateForm/AgentForm';
import MandateForm from './MandateForm/MandateForm';
import Broker from '@/components/core/Broker';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { SubmitHandler, FieldValues } from 'react-hook-form';

interface Props {
  initialValue: PropertyAgentsDetails[] | undefined;
  agents: AgentDetails[] | undefined;
  handleOnSubmitAgent: SubmitHandler<FieldValues>;
  goToPrevStep?: () => void;
  formContainerClass?: string;
  formRowClassName?: string;
  formColClassName?: string;
  isStepForm?: boolean;
  handleMandateOnSubmit: SubmitHandler<PropertyMandateRequest>;
  setAttachmentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  mandateInfo: PropertyMandateResponse | undefined;
  mandateFiles: FileResponse[];
  setMandateFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  handleGoToNextStep?: () => void;
  imageError: string;
}

const BrokerAndAuditForm: FCC<Props> = ({
  initialValue,
  agents,
  handleOnSubmitAgent,
  goToPrevStep,
  isStepForm,
  formContainerClass,
  formRowClassName,
  formColClassName,
  handleMandateOnSubmit,
  setAttachmentId,
  mandateInfo,
  mandateFiles,
  setMandateFiles,
  handleGoToNextStep,
  imageError,
}) => {
  const [defaultAgent, setDefaultAgent] = useState<PropertyAgentsDetails | undefined>(undefined);
  const [addAgent, setAddAgent] = useState<boolean>(isStepForm ? false : true);

  // set agent value in state to show in form to edit agent
  const handleDefaultAgent = (agent: PropertyAgentsDetails) => {
    setDefaultAgent(agent);
    setAddAgent(true);
  };
  return (
    <div className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div className={classNames('flex w-full', formContainerClass)}>
          <div className={classNames('flex space-y-4 lg:space-y-0 w-full', formRowClassName)}>
            <div className={classNames('flex flex-col lg:w-full space-y-4', formColClassName)}>
              <div
                className={`rounded-lg border-gray-blue-2 ${isStepForm ? 'md:px-2' : 'p-4 md:px-8 border bg-white'}`}
              >
                <AgentForm
                  initialValue={defaultAgent}
                  agents={agents}
                  handleOnSubmitAgent={handleOnSubmitAgent}
                  isStepForm={isStepForm}
                  addAgent={addAgent}
                  setAddAgent={setAddAgent}
                />
                {/* <hr className="mt-6" /> */}
                <h3 className="font-bold mb-4 space-y-4 mt-1">{'Agent Listing'}</h3>
                {initialValue &&
                  initialValue?.map((agent, index) => {
                    return (
                      <div className="mb-2" key={index}>
                        <Broker agent={agent} handleDefaultAgent={handleDefaultAgent} />
                      </div>
                    );
                  })}
                {initialValue && initialValue?.length === 0 && <p>{InfoMessages.DataNotFound}</p>}
              </div>
            </div>
          </div>
          <div className={classNames('flex flex-col lg:w-full space-y-4')}>
            <div
              className={`p-4 rounded-lg border-gray-blue-2 ${isStepForm ? 'md:px-2' : 'p-4 md:px-8 border bg-white'}`}
            >
              <MandateForm
                handleMandateOnSubmit={handleMandateOnSubmit}
                setAttachmentId={setAttachmentId}
                mandateInfo={mandateInfo}
                mandateFiles={mandateFiles}
                setMandateFiles={setMandateFiles}
                inputClassName="py-1"
                imageError={imageError}
              />
            </div>
          </div>
        </div>
      </section>
      {!isStepForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex justify-between">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            <Button
              type="button"
              onClick={handleGoToNextStep}
              className="ml-auto"
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

export default BrokerAndAuditForm;
