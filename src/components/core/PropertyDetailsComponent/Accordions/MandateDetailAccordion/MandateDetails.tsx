import React from 'react';
import { convertToLocalFormat } from '@/helpers/date-format';
import { PropertyMandateResponse } from '@/infrastructure/store/api/property/property-type';
import { InfoMessages } from '@/constant/InfoMessageOptions';
interface Props {
  propertyMandate?: PropertyMandateResponse[] | null;
}
const MandateDetails: React.FC<Props> = ({ propertyMandate }) => {
  return (
    <div className="px-4 pb-4 space-y-4">
      {propertyMandate?.length === 0 ? (
        <p className="mt-2 pb-4">{InfoMessages.DataNotFound}</p>
      ) : (
        <>
          <h3 className="font-bold">Mandate Details</h3>
          {propertyMandate?.map((mandate, index) => {
            if (index < 1) {
              return (
                <div className="space-y-4" key={index}>
                  <div>
                    <span className="ml-auto typography-label text-gray-6">Mandate Name</span>
                    <p className="typography-label font-medium text-gray-9">{mandate.name || ''}</p>
                  </div>
                  <div>
                    <span className="ml-auto typography-label text-gray-6">Start Date</span>
                    <p className="typography-label font-medium text-gray-9">
                      {mandate.startDate !== null ? convertToLocalFormat(mandate?.startDate) : ''}
                    </p>
                  </div>
                  <div>
                    <span className="ml-auto typography-label text-gray-6">End Date</span>
                    <p className="typography-label font-medium text-gray-9">
                      {mandate.endDate !== null ? convertToLocalFormat(mandate.endDate) : ''}
                    </p>
                  </div>
                  <div className="">
                    <p className="typography-label font-medium text-gray-7">Attachment</p>
                    <div className="flex items-center gap-2 mt-1">
                      {mandate?.attachmentURL ? (
                        <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                          <img className="h-full" src={mandate.attachmentURL} alt="Property" />
                        </span>
                      ) : (
                        ''
                      )}

                      {mandate?.attachmentURL ? (
                        <span className="typography-label font-medium">{mandate.attachmentName || 'Image Name'}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default MandateDetails;
