import Button from '@/components/core/Button';
import FileStack from '@/components/core/Filestack';
import Form from '@/components/core/Form';
import { PropertyDocumentType } from '@/constant/DocumentTypes';
import { MaxFileUpload } from '@/constant/FileUploadOption';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  onSubmitImages: SubmitHandler<FieldValues>;
  imagesFiles: FileResponse[];
  setImagesFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  imageError: string;
}

const ImagesForm: React.FC<Props> = ({ onSubmitImages, imagesFiles, setImagesFiles, imageError }) => {
  const useFormReturn = useForm();

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmitImages} className="w-full flex-1 flex flex-col">
      <div className="rounded-lg border-gray-blue-2">
        <h3 className="font-bold">Images Details</h3>

        <div className="mt-4 space-y-4">
          <FileStack
            label="Upload Main Image"
            files={imagesFiles}
            setFiles={setImagesFiles}
            isSingleFile={false}
            documentType={PropertyDocumentType.MainImage}
            isMainPrimary={true}
            maxFileUpload={MaxFileUpload.maxFile}
            imageError={imageError}
          />
          <FileStack
            label="Upload Floor Plan Images"
            files={imagesFiles}
            setFiles={setImagesFiles}
            isSingleFile={false}
            documentType={PropertyDocumentType.FloorPlanImage}
            isFloorPrimary={true}
            maxFileUpload={MaxFileUpload.maxFile}
            imageError={imageError}
          />
        </div>
      </div>

      <div className="rounded-lg border-gray-blue-2 mt-8">
        <h3 className="font-bold">Documents</h3>

        <div className="mt-4 space-y-4">
          <FileStack
            label="Upload Documents"
            files={imagesFiles}
            setFiles={setImagesFiles}
            isSingleFile={false}
            documentType={PropertyDocumentType.PropertyDocument}
            maxFileUpload={MaxFileUpload.maxFile}
            imageError={imageError}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" className="ml-auto">
          Save Images
        </Button>
      </div>
    </Form>
  );
};

export default ImagesForm;
