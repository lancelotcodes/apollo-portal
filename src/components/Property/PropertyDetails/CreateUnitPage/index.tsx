import IconButton from '@/components/core/IconButton';
import Steps from '@/components/core/Steps';
import useStep from '@/hooks/useStep';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const UnitDetailsFormContainer = lazy(() => import('./CreateUnitForms/UnitDetailsForm/index'));
const MediaFormContainer = lazy(() => import('./CreateUnitForms/MediaForm/index'));
const LeaseContactFormContainer = lazy(() => import('./CreateUnitForms/LeaseContactForm/index'));
const TenantFormContainer = lazy(() => import('./CreateUnitForms/TenantDetailsForm/index'));
const ReviewForm = lazy(() => import('./CreateUnitForms/ReviewForm'));

const steps = [
  { id: 1, name: 'Unit Details', component: UnitDetailsFormContainer },
  { id: 2, name: 'Upload Files', component: MediaFormContainer },
  { id: 3, name: 'Agent', component: LeaseContactFormContainer },
  { id: 4, name: 'Tenant', component: TenantFormContainer },
  { id: 5, name: 'Review', component: ReviewForm },
];

const CreateUnitPage = () => {
  const [currentStep, helpers] = useStep(5);
  const navigate = useNavigate();

  const current = steps[currentStep];

  return (
    <div className="bg-white h-full flex flex-col relative">
      <section className="flex flex-col lg:flex-row gap-4 lg:items-center border-b lg:py-2 lg:px-2">
        <div className="flex gap-2 flex-1 pt-2 lg:pt-0">
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </IconButton>

          <div className="flex-1">
            <h2>Create Unit</h2>
          </div>
        </div>

        <div className="pb-2 lg:pb-0">
          <Steps currentStep={currentStep} steps={steps} onChange={helpers.setStep} />
        </div>
      </section>

      <Suspense>
        <current.component {...helpers} />
      </Suspense>
    </div>
  );
};

export default CreateUnitPage;
