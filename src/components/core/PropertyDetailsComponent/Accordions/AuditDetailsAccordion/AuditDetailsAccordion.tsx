import React from 'react';
import { PropertySEOResponse } from '@/infrastructure/store/api/property/property-type';
import LinesEllipsis from 'react-lines-ellipsis';

const AuditDetailsAccordion: React.FC<PropertySEOResponse> = ({
  pageTitle,
  metaKeyword,
  url,
  isFeatured,
  isPublished,
  featuredWeight,
  pageDescription,
}) => {
  return (
    <div className="mt-2 px-4 pb-4">
      <h3 className="font-bold py-2">SEO Details</h3>
      <ul>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Page Title</span>
          <span className="typography-body text-black flex-1">{pageTitle || ''}</span>
        </li>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Meta Keyword</span>
          <span className="typography-body text-black flex-1">{metaKeyword || ''}</span>
        </li>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">URL</span>
          <span className="typography-body text-black flex-1">{url || ''}</span>
        </li>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Featured</span>
          <span className="typography-body text-black flex-1">{isFeatured ? 'Yes' : 'No'}</span>
        </li>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Published</span>
          <span className="typography-body text-black flex-1">{isPublished ? 'Yes' : 'No'}</span>
        </li>
        <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Feature Weight</span>
          <span className="typography-body text-black flex-1">{featuredWeight || ''}</span>
        </li>
        <li className="space-x-1 items-center w-full flex even:bg-blue-1 px-1 py-2">
          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Description</span>
          <span className="typography-body text-black flex-1">
            <LinesEllipsis text={pageDescription || ''} maxLine={2} />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AuditDetailsAccordion;
