import { classNames } from '@/helpers/classNames';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';
import Accordion from '../../Accordion';

const DocumentsAccordion = () => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            DOCUMENTS
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        <ul className="mt-2 px-4 pb-4 space-y-4">
          <li className="">
            <p className="typography-label font-medium text-gray-7">Uploaded Documents</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-10 w-10 rounded border-gray-3 bg-gray-2"></span>
              <span className="typography-label font-medium">File Name</span>
            </div>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default DocumentsAccordion;
