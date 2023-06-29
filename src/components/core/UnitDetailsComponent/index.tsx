import React from 'react';
import UnitDetailAccordionContainer from './Accordions/UnitDetailAccordion';
import MediaDetailAccordionContainer from './Accordions/MediaDetailAccordion';
import LeaseContractAccordionContainer from './Accordions/LeaseContractAccordion';
import { usePropertyDocumentsByIDQuery } from '@/infrastructure/store/api/property/property-api';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import SEODetailsAccordionContainer from './Accordions/SEODetailsAccodion';
import Loader from '../Loader';

interface Props {
  IsUnitTabForm?: boolean;
  unitID?: number;
}

const UnitDetailsComponent: React.FC<Props> = ({ IsUnitTabForm }) => {
  const { selectedProperty } = useAppSelector((state) => state['property-list']);
  const { selectedUnitDetails, selectedUnitDetailsLoading } = useAppSelector((state) => state['unit-list']);
  const { data: propertyDocuments } = usePropertyDocumentsByIDQuery(selectedUnitDetails?.propertyID, {
    skip: typeof selectedUnitDetails?.propertyID !== 'number',
  });

  return (
    <div className="flex flex-col md:flex-row h-full overflow-auto md:overflow-hidden bg-gray-blue-1">
      {selectedUnitDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="md:overflow-auto px-2 py-4 pb-2 md:pb-4 w-full space-y-4 md:flex-1">
            {selectedUnitDetails && (
              <UnitDetailAccordionContainer
                IsUnitTabForm={IsUnitTabForm}
                unitDetails={selectedUnitDetails}
                buildingId={selectedProperty?.id}
                propertyID={selectedUnitDetails?.propertyID}
              />
            )}

            <MediaDetailAccordionContainer
              IsUnitTabForm={IsUnitTabForm}
              propertyID={selectedUnitDetails?.propertyID}
              propertyDocuments={propertyDocuments?.data}
            />

            {/* <ImageAccordion /> */}

            {/* <DocumentsAccordion /> */}

            {/* <VideoAccordion /> */}
            {IsUnitTabForm && (
              <SEODetailsAccordionContainer isTabForm={IsUnitTabForm} propertyID={selectedUnitDetails?.propertyID} />
            )}
          </div>
          <div className="md:overflow-auto pb-20 md:flex-1 px-2 py-4 pt-2 md:pt-4 space-y-4">
            <LeaseContractAccordionContainer
              propertyID={selectedUnitDetails?.propertyID}
              IsUnitTabForm={IsUnitTabForm}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UnitDetailsComponent;
