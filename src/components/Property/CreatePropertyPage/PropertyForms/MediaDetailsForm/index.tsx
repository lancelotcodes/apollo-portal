import React, { useEffect, useState } from 'react';
import { FCC } from '@/helpers/FCC';
import { SessionUtils } from '@/helpers/session-storage';
import { StepHelpers } from '@/hooks/useStep';
import MediaForm from './MediaForm';
import { SessionOptions } from '@/constant/SessionOptions';
import { useParams } from 'react-router-dom';
import {
  usePropertyDocumentsByIDQuery,
  usePropertyVideoByIDQuery,
  useSavePropertyImagesMutation,
  useSavePropertyVideoMutation,
} from '@/infrastructure/store/api/property/property-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/core/Loader';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { SubmitHandler } from 'react-hook-form';
import { PropertyVideoRequest } from '@/infrastructure/store/api/property/property-type';

const MediaFormContainer: FCC<StepHelpers> = ({ goToNextStep, goToPrevStep }) => {
  const { id } = useParams();
  const propertyId = id
    ? parseInt(id)
    : SessionUtils.getItem(SessionOptions.propertyId)
    ? SessionUtils.getItem(SessionOptions.propertyId)
    : undefined;

  const [saveVideo] = useSavePropertyVideoMutation();
  const [saveImages] = useSavePropertyImagesMutation();

  const {
    data: videoInfo,
    isLoading: isVideoLoading,
    isSuccess: isVideoSuccess,
  } = usePropertyVideoByIDQuery(propertyId ?? skipToken);
  const {
    data: imagesInfo,
    isLoading: isImagesLoading,
    isSuccess: isImagesSuccess,
  } = usePropertyDocumentsByIDQuery(propertyId ?? skipToken);

  // Define state to get the images/document/video from the media form to send in save images/document/video mutation
  const [thumbNailId, setThumbNailId] = useState<number | undefined>(
    videoInfo && videoInfo?.data && videoInfo.data.thumbNailId,
  );
  const [videoFiles, setVideoFiles] = useState<FileResponse[]>([]);
  const [imagesFiles, setImagesFiles] = useState<FileResponse[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const handleVideoOnSubmit: SubmitHandler<PropertyVideoRequest> = async (e) => {
    (thumbNailId || videoInfo?.data.thumbNailId) && setImageError('File is required!');
    if (propertyId && (thumbNailId || videoInfo?.data.thumbNailId)) {
      const res = await saveVideo({
        ...e,
        propertyID: propertyId,
        thumbNailId: thumbNailId ? thumbNailId : videoInfo?.data.thumbNailId,
      }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep5: true }));
  };

  const handleImagesOnSubmit = async () => {
    const imagesList = imagesFiles.map((x) => {
      return {
        id: x.id,
        documentID: x.id,
        documentType: x.documentType,
        isPrimary: x.isPrimary ? x.isPrimary : false,
      };
    });
    imagesList.length === 0 && setImageError('File is required!');
    if (propertyId && imagesList.length !== 0) {
      const res = await saveImages({ propertyID: propertyId, images: imagesList }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };

  const handleGoToNextStep = () => {
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep5: true }));
    goToNextStep();
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
  const loading = isVideoLoading || isImagesLoading;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <MediaForm
          handleImagesOnSubmit={handleImagesOnSubmit}
          handleVideoOnSubmit={handleVideoOnSubmit}
          goToPrevStep={goToPrevStep}
          formRowClassName="lg:flex-row lg:space-x-4"
          videoInfo={videoInfo?.data}
          videoFiles={videoFiles}
          imageError={imageError}
          setVideoFiles={setVideoFiles}
          setThumbNailId={setThumbNailId}
          imagesFiles={imagesFiles}
          setImagesFiles={setImagesFiles}
          handleGoToNextStep={handleGoToNextStep}
        />
      )}
    </>
  );
};

export default MediaFormContainer;
