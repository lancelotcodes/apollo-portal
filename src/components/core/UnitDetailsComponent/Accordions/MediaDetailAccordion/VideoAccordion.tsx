import { PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import React from 'react';

const VideoAccordion: React.FC<PropertyVideoResponse> = ({
  documentName,
  documentPath,
  thumbNailPath,
  thumbNailName,
}) => {
  return (
    <div className="mt-2 px-4 pb-4 space-y-4">
      <h3 className="font-bold">Video Details</h3>
      <div>
        <span className="ml-auto typography-label text-gray-6">Video Name</span>
        <p className="typography-label font-medium text-gray-9">{documentName || ''}</p>
      </div>
      <div>
        <span className="ml-auto typography-label text-gray-6">Video Link</span>
        <p className="typography-label font-medium text-gray-9">{documentPath || 'https://my-video-link.com'}</p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
          <img className="h-full" src={thumbNailPath} alt="video" />
        </span>
        <span className="typography-label font-medium">{thumbNailName || 'Image Name'}</span>
        {/* <span className="ml-auto typography-label text-gray-6">+3 files in the library</span> */}
      </div>
    </div>
  );
};

export default VideoAccordion;
