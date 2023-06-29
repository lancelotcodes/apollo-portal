import React, { useEffect, useState } from 'react';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import MediaForm from './MediaForm';
import {
  usePropertyDocumentsByIDQuery,
  usePropertyVideoByIDQuery,
  useSavePropertyImagesMutation,
  useSavePropertyVideoMutation,
} from '@/infrastructure/store/api/property/property-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import Loader from '@/components/core/Loader';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import { HandleNotification } from '@/components/core/ToastAlert';
import { SubmitHandler } from 'react-hook-form';
import { PropertyVideoRequest } from '@/infrastructure/store/api/property/property-type';
import { useBuildingFloorUnitByIdQuery } from '@/infrastructure/store/api/stacking/stacking-api';

const MediaFormContainer: FCC<StepHelpers> = ({ goToNextUnitStep, goToPrevStep }) => {
  const [unitId] = useState<number | undefined>(
    SessionUtils.getItem(SessionOptions.unitId) ? SessionUtils.getItem(SessionOptions.unitId) : undefined,
  );
  const [saveVideo] = useSavePropertyVideoMutation();
  const [saveImages] = useSavePropertyImagesMutation();

  const { data: buildingUnitDetails, isLoading: isBuildingUnitDetailsLoading } = useBuildingFloorUnitByIdQuery(
    unitId ?? skipToken,
  );
  SessionUtils.setItem(SessionOptions.propertyId, buildingUnitDetails?.data?.propertyID);

  const {
    data: videoInfo,
    isLoading: isVideoLoading,
    isSuccess: isVideoSuccess,
  } = usePropertyVideoByIDQuery(buildingUnitDetails?.data?.propertyID ?? skipToken);
  const {
    data: imagesInfo,
    isLoading: isImagesLoading,
    isSuccess: isImagesSuccess,
  } = usePropertyDocumentsByIDQuery(buildingUnitDetails?.data?.propertyID ?? skipToken);

  // Define state to get the images/document/video from the media form to send in save images/document/video mutation
  const [thumbNailId, setThumbNailId] = useState<number | undefined>(
    videoInfo && videoInfo?.data && videoInfo.data.thumbNailId,
  );
  const [videoFiles, setVideoFiles] = useState<FileResponse[]>([]);
  const [imagesFiles, setImagesFiles] = useState<FileResponse[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const onSubmitVideo: SubmitHandler<PropertyVideoRequest> = async (e) => {
    if (buildingUnitDetails?.data?.propertyID && (thumbNailId || videoInfo?.data.thumbNailId)) {
      const res = await saveVideo({
        ...e,
        propertyID: buildingUnitDetails?.data?.propertyID,
        thumbNailId: thumbNailId ? thumbNailId : videoInfo?.data.thumbNailId,
      }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

  const onSubmitImages = async () => {
    const imagesList = imagesFiles.map((x) => {
      return {
        id: x.id,
        documentID: x.id,
        documentType: x.documentType,
        isPrimary: x.isPrimary ? x.isPrimary : false,
      };
    });
    imagesList.length === 0 && setImageError('File is required!');
    if (buildingUnitDetails?.data?.propertyID && imagesList.length !== 0) {
      const res = await saveImages({ propertyID: buildingUnitDetails?.data?.propertyID, images: imagesList }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

  useEffect(() => {
    // Reset default value in the uploader (Video form)
    if (isVideoSuccess && videoInfo?.data !== null) {
      setVideoFiles([
        {
          id: videoInfo?.data.thumbNailId,
          documentName: videoInfo?.data.thumbNailName,
          documentSize: 0,
          documentPath: videoInfo?.data.thumbNailPath,
        },
      ]);
    }
  }, [isVideoSuccess, videoInfo?.data]);

  useEffect(() => {
    // Reset default value in the uploader (images/document form)
    if (isImagesSuccess && imagesInfo?.data !== null) {
      setImagesFiles(imagesInfo?.data);
    }
  }, [isImagesSuccess, imagesInfo?.data, setImagesFiles]);

  // Query IsLoading true
  const loading = isVideoLoading || isImagesLoading || isBuildingUnitDetailsLoading;

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <MediaForm
          onSubmitVideo={onSubmitVideo}
          goToNextUnitStep={goToNextUnitStep}
          goToPrevStep={goToPrevStep}
          setThumbNailId={setThumbNailId}
          videoInfo={videoInfo?.data}
          videoFiles={videoFiles}
          setVideoFiles={setVideoFiles}
          onSubmitImages={onSubmitImages}
          imagesFiles={imagesFiles}
          setImagesFiles={setImagesFiles}
          imageError={imageError}
          cardRowClass=" lg:flex-row lg:space-x-4"
          cardColOneClass="lg:w-1/2"
          cardColTwoClass="lg:w-1/2"
          cardBorderClass="lg:px-8 rounded-lg bg-white border border-gray-blue-2"
        />
      )}
    </React.Fragment>
  );
};

export default MediaFormContainer;
