import { PropertyDocumentType } from '@/constant/DocumentTypes';
import { PropertyDocumentResponse } from '@/infrastructure/store/api/property/property-type';
import React from 'react';

interface Props {
  propertyDocuments?: PropertyDocumentResponse[];
}
const ImageAccordion: React.FC<Props> = ({ propertyDocuments }) => {
  return (
    <ul className="mt-2 px-4 pb-4 space-y-4">
      <h3 className="font-bold">Images Details</h3>
      <li className="">
        <p className="typography-label font-medium text-gray-7">Main Images</p>
        {propertyDocuments &&
          propertyDocuments?.map((img, index) => {
            if (img.documentType === PropertyDocumentType.MainImage) {
              return (
                <div key={index} className="flex items-center gap-2 mt-1">
                  <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                    <img className="h-full" src={img?.documentPath} alt="Property" />
                  </span>
                  <span className="typography-label font-medium">{img?.documentName || 'Image Name'}</span>
                </div>
              );
            }
            return null;
          })}
        {/* <div className="flex items-center gap-2 mt-1">
          <span className="h-10 w-10 rounded border-gray-3 bg-gray-2"></span>
          <span className="typography-label font-medium">Image Name</span>
          <span className="ml-auto typography-label text-gray-6">+3 files in the library</span>
        </div> */}
      </li>

      <li className="">
        <p className="typography-label font-medium text-gray-7">Floorplan Images</p>
        {propertyDocuments !== null &&
          propertyDocuments?.map((img, index) => {
            if (img.documentType === PropertyDocumentType.FloorPlanImage) {
              return (
                <div key={index} className="flex items-center gap-2 mt-1">
                  <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                    <img className="h-full" src={img?.documentPath} alt="Property" />
                  </span>
                  <span className="typography-label font-medium">{img?.documentName || 'Image Name'}</span>
                </div>
              );
            }
            return null;
          })}
      </li>
    </ul>
  );
};

export default ImageAccordion;
