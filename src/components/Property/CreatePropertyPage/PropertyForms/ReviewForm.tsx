import React, { lazy, Suspense, useState } from 'react';
import { SessionOptions } from '@/constant/SessionOptions';
import { FCC } from '@/helpers/FCC';
import { SessionUtils } from '@/helpers/session-storage';
import { useSelectedProperty } from '@/hooks/useSelectedProperty';
import { StepHelpers } from '@/hooks/useStep';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useParams } from 'react-router-dom';

const PropertyDetailsComponent = lazy(() => import('@/components/core/PropertyDetailsComponent'));
const ReviewForm: FCC<StepHelpers> = ({ goToPrevStep }) => {
  const params = useParams();
  const [propertyID] = useState<number | undefined>(
    params.id
      ? parseInt(params.id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : undefined,
  );

  const sessionSteps = SessionUtils.getItem('isStepValidated');
  SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep6: true }));

  useSelectedProperty(propertyID ? propertyID : null);

  const {
    selectedPropertyInfo,
    selectedPropertyAgents,
    selectedProperty,
    selectedPropertyAddress,
    selectedPropertyVideo,
    selectedPropertyDocuments,
    selectedPropertyMandate,
  } = useAppSelector((app) => app['property-list']);

  // TODO: pass as props property info, building address and other props to  <PropertyDetailsComponent {} />
  return (
    <>
      {selectedPropertyAddress && selectedPropertyInfo && selectedPropertyAgents && (
        <Suspense>
          <PropertyDetailsComponent
            isTabForm={false}
            propertyInfo={selectedPropertyInfo}
            propertyAgents={selectedPropertyAgents}
            property={selectedProperty}
            propertyAddress={selectedPropertyAddress}
            propertyVideo={selectedPropertyVideo}
            propertyDocuments={selectedPropertyDocuments}
            propertyMandate={selectedPropertyMandate}
            goToPrevStep={goToPrevStep}
          />
        </Suspense>
      )}
    </>
  );
};

export default ReviewForm;
