import { classNames } from '@/helpers/classNames';
import { convertToLocalFormat } from '@/helpers/date-format';
import { PropertyMandateResponse } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import Accordion from '../../Accordion';
interface Props {
  propertyMandate?: PropertyMandateResponse[] | null;
  isTabForm?: boolean | null | undefined;
}

const DocumentsAccordion: React.FC<Props> = ({ propertyMandate, isTabForm }) => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && <PencilAltIcon className={classNames('h-5 w-5 mr-1 transition-transform')} />}
              MANDATE
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        <ul className="mt-2 px-4 pb-4 space-y-4">
          <div>
            <span className="ml-auto typography-label text-gray-6">Mandate Name</span>
            <p className="typography-label font-medium text-gray-9">
              {(propertyMandate && propertyMandate[0]?.name) || 'The name of my video'}
            </p>
          </div>
          <div>
            <span className="ml-auto typography-label text-gray-6">Start Date</span>
            <p className="typography-label font-medium text-gray-9">
              {(propertyMandate && convertToLocalFormat(propertyMandate[0]?.startDate)) || 'The name of my video'}
            </p>
          </div>
          <div>
            <span className="ml-auto typography-label text-gray-6">End Date</span>
            <p className="typography-label font-medium text-gray-9">
              {(propertyMandate && convertToLocalFormat(propertyMandate[0]?.endDate)) || 'The name of my video'}
            </p>
          </div>
          <li className="">
            <p className="typography-label font-medium text-gray-7">Attachment</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                <img className="h-full" src={propertyMandate ? propertyMandate[0]?.attachmentURL : ''} alt="Property" />
              </span>
              <span className="typography-label font-medium">
                {(propertyMandate && propertyMandate[0]?.attachmentName) || 'Image Name'}
              </span>
            </div>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default DocumentsAccordion;
