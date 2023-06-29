import Accordion from '@/components/core/Accordion';
import { classNames } from '@/helpers/classNames';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import VideoAccordion from './VideoAccordion';
import ImageAccordion from './ImageAccordion';
import DocumentsAccordion from './DocumentsAccordion';
import MediaForm from '@/components/Property/PropertyDetails/CreateUnitPage/CreateUnitForms/MediaForm/MediaForm';
import {
  usePropertyDocumentsByIDQuery,
  usePropertyVideoByIDQuery,
  useSavePropertyImagesMutation,
  useSavePropertyVideoMutation,
} from '@/infrastructure/store/api/property/property-api';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { PropertyDocumentResponse, PropertyVideoRequest } from '@/infrastructure/store/api/property/property-type';
import { SubmitHandler } from 'react-hook-form';
import { HandleNotification } from '@/components/core/ToastAlert';
import Loader from '@/components/core/Loader';

export interface Props {
  propertyID?: number;
  IsUnitTabForm?: boolean;
  propertyDocuments?: PropertyDocumentResponse[];
}
const MediaDetailAccordionContainer: React.FC<Props> = ({ propertyID, IsUnitTabForm, propertyDocuments }) => {
  const [mediaDetailsForm, setMediaDetailsForm] = useState<boolean>(false);

  const [saveVideo] = useSavePropertyVideoMutation();
  const [saveImages] = useSavePropertyImagesMutation();
  const {
    data: videoInfo,
    isLoading: isVideoLoading,
    isSuccess: isVideoSuccess,
  } = usePropertyVideoByIDQuery(propertyID ?? skipToken);
  const {
    data: imagesInfo,
    isLoading: isImagesLoading,
    isFetching: isImagesFetching,
    isSuccess: isImagesSuccess,
  } = usePropertyDocumentsByIDQuery(propertyID ?? skipToken);

  const [thumbNailId, setThumbNailId] = useState<number | undefined>(
    videoInfo && videoInfo?.data && videoInfo.data.thumbNailId,
  );
  const [videoFiles, setVideoFiles] = useState<FileResponse[]>([]);
  const [imagesFiles, setImagesFiles] = useState<FileResponse[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const onSubmitVideo: SubmitHandler<PropertyVideoRequest> = async (e) => {
    (thumbNailId || videoInfo?.data.thumbNailId) && setImageError('File is required!');
    if (propertyID && (thumbNailId || videoInfo?.data.thumbNailId)) {
      const res = await saveVideo({
        ...e,
        propertyID: propertyID,
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
    if (propertyID && imagesList.length !== 0) {
      const res = await saveImages({ propertyID: propertyID, images: imagesList }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
  };
  useEffect(() => {
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
    if (isImagesSuccess && imagesInfo?.data !== null) {
      setImagesFiles(imagesInfo?.data);
    }
  }, [isImagesSuccess, imagesInfo?.data]);

  const handleMediaDetailsTab = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setMediaDetailsForm(true);
    } else {
      setMediaDetailsForm(!mediaDetailsForm);
      event?.stopPropagation();
    }
  };
  const loading = isVideoLoading || isImagesLoading || isImagesFetching;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        IsFileStackUploader={true}
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {IsUnitTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleMediaDetailsTab(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform', !open)}
                />
              )}
              IMAGE DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {mediaDetailsForm && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <MediaForm
                onSubmitVideo={onSubmitVideo}
                setThumbNailId={setThumbNailId}
                videoInfo={videoInfo?.data}
                videoFiles={videoFiles}
                setVideoFiles={setVideoFiles}
                onSubmitImages={onSubmitImages}
                imagesFiles={imagesFiles}
                setImagesFiles={setImagesFiles}
                IsUnitTabForm={IsUnitTabForm}
                imageError={imageError}
                cardColOneClass="lg:w-full"
                cardColTwoClass="lg:w-full"
              />
            )}
          </>
        )}
        {!mediaDetailsForm && (
          <React.Fragment>
            {videoInfo?.data && <VideoAccordion {...videoInfo?.data} />}
            {propertyDocuments && <ImageAccordion propertyDocuments={propertyDocuments} />}
            {propertyDocuments && <DocumentsAccordion propertyDocuments={propertyDocuments} />}
          </React.Fragment>
        )}
      </Accordion>
    </div>
  );
};

export default MediaDetailAccordionContainer;
