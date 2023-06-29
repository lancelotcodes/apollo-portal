import React from 'react';
import Button from '@/components/core/Button';
import { FCC } from '@/helpers/FCC';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { classNames } from '@/helpers/classNames';
import { PropertyVideoRequest, PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import VideoForm from './MediaForm/VideoForm';
import ImagesForm from './MediaForm/ImagesForm';
import { SubmitHandler, FieldValues } from 'react-hook-form';

interface Props {
  handleImagesOnSubmit: SubmitHandler<FieldValues>;
  handleVideoOnSubmit: SubmitHandler<PropertyVideoRequest>;
  handleGoToNextStep?: () => void;
  goToPrevStep?: () => void;
  formRowClassName?: string;
  formColClassName?: string;
  isStepForm?: boolean;
  videoInfo: PropertyVideoResponse | undefined;
  videoFiles: FileResponse[];
  setVideoFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  setThumbNailId: React.Dispatch<React.SetStateAction<number | undefined>>;
  imagesFiles: FileResponse[];
  setImagesFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  imageError: string;
}
const MediaForm: FCC<Props> = ({
  handleImagesOnSubmit,
  handleVideoOnSubmit,
  goToPrevStep,
  handleGoToNextStep,
  formRowClassName,
  formColClassName,
  isStepForm,
  videoFiles,
  setVideoFiles,
  setThumbNailId,
  videoInfo,
  imagesFiles,
  setImagesFiles,
  imageError,
}) => {
  return (
    <React.Fragment>
      <div className="w-full flex-1 flex flex-col">
        <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
          <div className={classNames('flex flex-col lg:flex-row space-y-4 lg:space-y-0 w-full', formRowClassName)}>
            <div className={classNames('flex flex-col lg:w-full space-y-4', formColClassName)}>
              <div className="p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2">
                <VideoForm
                  handleVideoOnSubmit={handleVideoOnSubmit}
                  setThumbNailId={setThumbNailId}
                  videoInfo={videoInfo}
                  videoFiles={videoFiles}
                  setVideoFiles={setVideoFiles}
                  imageError={imageError}
                />
              </div>
            </div>

            <div className={classNames('flex flex-col lg:w-full space-y-4 mt-1')}>
              <ImagesForm
                imageError={imageError}
                handleImagesOnSubmit={handleImagesOnSubmit}
                imagesFiles={imagesFiles}
                setImagesFiles={setImagesFiles}
              />
            </div>
          </div>
        </section>
        {!isStepForm && (
          <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
            <div className="flex justify-between">
              <Button
                btnType="link"
                type="button"
                onClick={goToPrevStep}
                icon={<ChevronLeftIcon className="h-6 w-5" />}
              >
                PREVIOUS STEP
              </Button>
              <Button
                className="ml-auto"
                onClick={handleGoToNextStep}
                suffix={<ChevronRightIcon className="h-6 w-5" />}
              >
                NEXT STEP
              </Button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MediaForm;
