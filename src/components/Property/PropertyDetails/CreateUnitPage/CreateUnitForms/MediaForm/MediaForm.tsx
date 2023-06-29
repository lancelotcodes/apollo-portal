import React from 'react';
import Button from '@/components/core/Button';
import { FCC } from '@/helpers/FCC';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import ImagesForm from './Forms/ImagesForm';
import VideoForm from './Forms/VideoForm';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { PropertyVideoRequest, PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import { classNames } from '@/helpers/classNames';

interface Props {
  onSubmitVideo: SubmitHandler<PropertyVideoRequest>;
  goToPrevStep?: () => void;
  goToNextUnitStep?: () => void;
  setThumbNailId: React.Dispatch<React.SetStateAction<number | undefined>>;
  videoInfo?: PropertyVideoResponse | undefined;
  videoFiles: FileResponse[];
  setVideoFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  onSubmitImages: SubmitHandler<FieldValues>;
  imagesFiles: FileResponse[];
  setImagesFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  IsUnitTabForm?: boolean;
  cardBorderClass?: string;
  cardRowClass?: string;
  cardColOneClass?: string;
  cardColTwoClass?: string;
  imageError: string;

  // formRowClassName?: string;
  // formColClassName?: string;
}
const MediaForm: FCC<Props> = ({
  goToNextUnitStep,
  goToPrevStep,
  onSubmitVideo,
  setThumbNailId,
  videoInfo,
  videoFiles,
  setVideoFiles,
  onSubmitImages,
  imagesFiles,
  setImagesFiles,
  IsUnitTabForm,
  cardBorderClass,
  cardRowClass,
  cardColOneClass,
  cardColTwoClass,
  imageError,
}) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div className={classNames('flex flex-col space-y-4 lg:space-y-0 w-full', cardRowClass)}>
          <div className={classNames('flex flex-col space-y-4', cardColOneClass)}>
            <div className={classNames('p-4', cardBorderClass)}>
              <VideoForm
                onSubmitVideo={onSubmitVideo}
                setThumbNailId={setThumbNailId}
                videoInfo={videoInfo}
                videoFiles={videoFiles}
                setVideoFiles={setVideoFiles}
              />
            </div>
          </div>

          <div className={classNames('flex flex-col space-y-4', cardColTwoClass)}>
            <div className={classNames('p-4', cardBorderClass)}>
              <ImagesForm
                onSubmitImages={onSubmitImages}
                imagesFiles={imagesFiles}
                setImagesFiles={setImagesFiles}
                imageError={imageError}
              />
            </div>
          </div>
        </div>
      </section>
      {!IsUnitTabForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex justify-between">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            <Button
              className="ml-auto"
              type="button"
              onClick={goToNextUnitStep}
              suffix={<ChevronRightIcon className="h-6 w-5" />}
            >
              NEXT STEP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaForm;
