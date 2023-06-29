import { classNames } from '@/helpers/classNames';
import { PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import Accordion from '../../Accordion';
interface Props {
  propertyVideo?: PropertyVideoResponse | null;
  isTabForm?: boolean | null | undefined;
}

const VideoAccordion: React.FC<Props> = ({ propertyVideo, isTabForm }) => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && <PencilAltIcon className={classNames('h-5 w-5 mr-1 transition-transform')} />}
              360 VIDEO
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        <div className="mt-2 px-4 pb-4 space-y-4">
          <div>
            <span className="ml-auto typography-label text-gray-6">Video Name</span>
            <p className="typography-label font-medium text-gray-9">
              {propertyVideo?.documentName || 'The name of my video'}
            </p>
          </div>
          <div>
            <span className="ml-auto typography-label text-gray-6">Video Link</span>
            <p className="typography-label font-medium text-gray-9">
              {propertyVideo?.documentPath || 'https://my-video-link.com'}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
              <img className="h-full" src={propertyVideo?.thumbNailPath} alt="video" />
            </span>
            <span className="typography-label font-medium">{propertyVideo?.thumbNailName || 'Image Name'}</span>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default VideoAccordion;
