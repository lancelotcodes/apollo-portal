import React, { lazy, Suspense, useEffect } from 'react';
import Steps from '@/components/core/Steps';
import useStep from '@/hooks/useStep';
import LocationDetailsFormContainer from './PropertyForms/LocationDetailsForm';
import BuildingDetailsFormContainer from './PropertyForms/BuildingsDetailsForm';
import BrokerAndAuditFormContainer from './PropertyForms/BrokerAndAuditDetailsForm';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { SessionUtils } from '@/helpers/session-storage';
import { StepsValidation, StepsValidationWithOutBuilding } from '@/constant/StepsValidation';
const MediaForm = lazy(() => import('./PropertyForms/MediaDetailsForm/MediaForm'));
const PropertyDetailsFormContainer = lazy(() => import('./PropertyForms/PropertyDetailsForm/Index'));
const ReviewForm = lazy(() => import('./PropertyForms/ReviewForm'));

const steps = [
  { id: 1, name: 'Property Details', component: PropertyDetailsFormContainer },
  { id: 2, name: 'Location', component: LocationDetailsFormContainer },
  { id: 3, name: 'Buildings', component: BuildingDetailsFormContainer },
  { id: 4, name: 'Media', component: MediaForm },
  { id: 5, name: 'Agent', component: BrokerAndAuditFormContainer },
  { id: 6, name: 'Review', component: ReviewForm },
];

const CreateProperty = () => {
  const stateSteps = useAppSelector((state) => state['property-create'].steps);
  const [currentStep, helpers] = useStep(stateSteps.length);
  const current = stateSteps[currentStep];

  console.log('stateSteps', steps.length);

  useEffect(() => {
    console.log(stateSteps);
  }, [currentStep, stateSteps]);
  useEffect(() => {
    if (stateSteps.length === 6) {
      SessionUtils.setItem('isStepValidated', JSON.stringify(StepsValidation));
    } else {
      SessionUtils.setItem('isStepValidated', JSON.stringify(StepsValidationWithOutBuilding));
    }
  }, [stateSteps]);

  return (
    <div
      className="
    bg-white h-full flex flex-col relative"
    >
      <section>
        <div className="p-2 sm:p-4 flex sm:gap-4 sm:justify-between w-full items-center">
          <h1 className="font-bold">Create New Property</h1>
        </div>

        <div className="px-2 sm:px-4 py-2 w-full border-b">
          <Steps currentStep={currentStep} steps={stateSteps} onChange={(e) => helpers.setStep(e)} isDisable={false} />
        </div>
      </section>

      <Suspense>
        <current.component {...helpers} />
      </Suspense>
    </div>
  );
};

export default CreateProperty;
