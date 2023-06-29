import DocumentFileIcon from '@/components/core/Icon/app-wide/DocumentIcon';
import { PropertyDocumentType } from '@/constant/DocumentTypes';
import { CheckFileType } from '@/constant/FileUploadOption';
import { PropertyDocumentResponse } from '@/infrastructure/store/api/property/property-type';
import React from 'react';
interface Props {
  propertyDocuments?: PropertyDocumentResponse[];
}
const DocumentsAccordion: React.FC<Props> = ({ propertyDocuments }) => {
  return (
    <ul className="mt-2 px-4 pb-4 space-y-4">
      <h3 className="font-bold">Documents Details</h3>
      <li className="">
        <p className="typography-label font-medium text-gray-7">Uploaded Documents</p>
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
    </ul>
  );
};

export default DocumentsAccordion;
