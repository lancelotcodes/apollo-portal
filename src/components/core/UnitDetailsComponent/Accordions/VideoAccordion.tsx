import { classNames } from '@/helpers/classNames';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';
import Accordion from '../../Accordion';

const VideoAccordion = () => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            360 VIDEO
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        <div className="mt-2 px-4 pb-4 space-y-4">
          <div>
            <span className="ml-auto typography-label text-gray-6">Video Name</span>
            <p className="typography-label font-medium text-gray-9">The name of my video</p>
          </div>
          <div>
            <span className="ml-auto typography-label text-gray-6">Video Link</span>
            <p className="typography-label font-medium text-gray-9">https://my-video-link.com</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-10 w-10 rounded border-gray-3 bg-gray-2"></span>
            <span className="typography-label font-medium">Image Name</span>
            <span className="ml-auto typography-label text-gray-6">+3 files in the library</span>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default VideoAccordion;
