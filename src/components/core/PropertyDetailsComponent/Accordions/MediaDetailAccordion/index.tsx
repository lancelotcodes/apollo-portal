import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import MediaForm from '@/components/Property/CreatePropertyPage/PropertyForms/MediaDetailsForm/MediaForm';
import { classNames } from '@/helpers/classNames';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import {
  usePropertyDocumentsByIDQuery,
  usePropertyVideoByIDQuery,
  useSavePropertyImagesMutation,
  useSavePropertyVideoMutation,
} from '@/infrastructure/store/api/property/property-api';
import {
  PropertyDocumentResponse,
  PropertyVideoRequest,
  PropertyVideoResponse,
} from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../../../Accordion';
import ImageAccordion from './ImageAccordion';
import { SubmitHandler } from 'react-hook-form';
interface Props {
  propertyVideo?: PropertyVideoResponse | null;
  propertyDocuments?: PropertyDocumentResponse[] | null;
  isTabForm?: boolean | null | undefined;
}

const ImageAccordionContainer: React.FC<Props> = ({ propertyVideo, propertyDocuments, isTabForm }) => {
  const [mediaFormTab, setMediaFormTab] = React.useState<boolean>(false);

  const handleTabPropertyMediaForm = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setMediaFormTab(!mediaFormTab);
    } else {
      setMediaFormTab(!mediaFormTab);
      event?.stopPropagation();
    }
  };

  const { propertyId } = useParams();
  const [propertyID] = useState<number | undefined>(propertyId ? parseInt(propertyId) : undefined);

  const [saveVideo] = useSavePropertyVideoMutation();
  const [saveImages] = useSavePropertyImagesMutation();

  const {
    data: videoInfo,
    isLoading: isVideoLoading,
    isFetching: isVideoFetching,
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

  const handleVideoOnSubmit: SubmitHandler<PropertyVideoRequest> = async (e) => {
    if (propertyID && (thumbNailId || videoInfo?.data.thumbNailId)) {
      const res = await saveVideo({
        ...e,
        propertyID: propertyID,
        thumbNailId: thumbNailId ? thumbNailId : videoInfo?.data.thumbNailId,
      }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
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

  const loading = isVideoLoading || isVideoFetching || isImagesLoading || isImagesFetching;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        IsFileStackUploader={true}
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleTabPropertyMediaForm(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform')}
                />
              )}
              MEDIA DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {mediaFormTab && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <MediaForm
                handleImagesOnSubmit={handleImagesOnSubmit}
                handleVideoOnSubmit={handleVideoOnSubmit}
                formRowClassName="lg:flex-col lg:space-x-0"
                formColClassName="mb-4"
                isStepForm={true}
                videoInfo={videoInfo?.data}
                videoFiles={videoFiles}
                setVideoFiles={setVideoFiles}
                setThumbNailId={setThumbNailId}
                imagesFiles={imagesFiles}
                setImagesFiles={setImagesFiles}
                imageError={imageError}
              />
            )}
          </>
        )}

        {!mediaFormTab && (propertyVideo || propertyDocuments) && (
          <ImageAccordion propertyVideo={propertyVideo} propertyDocuments={propertyDocuments} />
        )}
      </Accordion>
    </div>
  );
};

export default ImageAccordionContainer;
