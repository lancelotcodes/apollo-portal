import { PropertyDocumentType } from '@/constant/DocumentTypes';
import { PropertyDocumentResponse, PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import React from 'react';
import DocumentFileIcon from '@/components/core/Icon/app-wide/DocumentIcon';
import { CheckFileType } from '@/constant/FileUploadOption';
import { InfoMessages } from '@/constant/InfoMessageOptions';

interface Props {
  propertyVideo?: PropertyVideoResponse | null;
  propertyDocuments?: PropertyDocumentResponse[] | null;
}

const ImageAccordion: React.FC<Props> = ({ propertyVideo, propertyDocuments }) => {
  return (
    <React.Fragment>
      <div className="mt-2 px-4 pb-4 space-y-4">
        <h3 className="font-bold">Video Details</h3>
        {propertyVideo === null ? (
          <p className="mt-2 pb-4">{InfoMessages.DataNotFound}</p>
        ) : (
          <>
            <div>
              <span className="ml-auto typography-label text-gray-6">Video Name</span>
              <p className="typography-label font-medium text-gray-9">{propertyVideo?.documentName || 'N/A'}</p>
            </div>
            <div>
              <span className="ml-auto typography-label text-gray-6">Video Link</span>
              <p className="typography-label font-medium text-gray-9">{propertyVideo?.documentPath || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {propertyVideo?.thumbNailPath !== null ? (
                <>
                  <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                    <img className="h-full" src={propertyVideo?.thumbNailPath} alt="video" />
                  </span>
                  <span className="typography-label font-medium">
                    {propertyVideo?.thumbNailName || 'Thumbnail Name'}
                  </span>
                </>
              ) : (
                <div>
                  <span className="ml-auto typography-label text-gray-6">Thumbnail</span>
                  <p className="typography-label font-medium text-gray-9">{'N/A'}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ul className="mt-2 px-4 pb-4 space-y-4">
        <h3 className="font-bold">Images Details</h3>
        {propertyDocuments?.length !== 0 ? (
          <>
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
            </li>
            <li className="">
              <p className="typography-label font-medium text-gray-7">Floor Plan Images</p>
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
            <li className="">
              <p className="typography-label font-medium text-gray-7">Uploaded Document</p>
              {propertyDocuments !== null &&
                propertyDocuments?.map((img, index) => {
                  if (img.documentType === PropertyDocumentType.PropertyDocument) {
                    const documentType = CheckFileType(img?.documentName);
                    return (
                      <div key={index} className="flex items-center gap-2 mt-1">
                        <span className="h-10 w-10 rounded border-gray-3 bg-gray-2">
                          {documentType === 'docx' ||
                          documentType === 'doc' ||
                          documentType === 'pdf' ||
                          documentType === 'xls' ||
                          documentType === 'xlsx' ? (
                            <DocumentFileIcon />
                          ) : (
                            <img className="h-full" src={img?.documentPath} alt="Property" />
                          )}
                        </span>
                        <span className="typography-label font-medium">{img?.documentName || 'Image Name'}</span>
                        {/* <span className="ml-auto typography-label text-gray-6">+3 files in the library</span> */}
                      </div>
                    );
                  }
                  return null;
                })}
            </li>
          </>
        ) : (
          <p className="mt-2 pb-4">{InfoMessages.DataNotFound}</p>
        )}
      </ul>
    </React.Fragment>
  );
};

export default ImageAccordion;
