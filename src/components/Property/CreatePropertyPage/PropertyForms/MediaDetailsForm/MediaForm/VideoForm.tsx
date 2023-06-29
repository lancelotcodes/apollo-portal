import FileStack from '@/components/core/Filestack';
import Form from '@/components/core/Form';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { PropertyVideoRequest, PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import React, { useEffect } from 'react';
import Button from '@/components/core/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveVideoResolver } from '@/form-resolvers/create-property/save-video-resolver';
import { MaxFileUpload } from '@/constant/FileUploadOption';

interface Props {
  handleVideoOnSubmit: SubmitHandler<PropertyVideoRequest>;
  setThumbNailId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  videoInfo: PropertyVideoResponse | undefined;
  videoFiles: FileResponse[];
  setVideoFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  imageError: string;
}

const VideoForm: React.FC<Props> = ({
  handleVideoOnSubmit,
  setThumbNailId,
  videoInfo,
  videoFiles,
  setVideoFiles,
  imageError,
}) => {
  const useFormReturn = useForm({
    defaultValues: videoInfo,
    resolver: yupResolver(saveVideoResolver),
  });
  const { reset: videoReset } = useFormReturn;

  useEffect(() => {
    // Reset default value in the form's (Video form)
    if (videoInfo) {
      videoReset(videoInfo);
    }
  }, [videoInfo, videoReset]);

  return (
    <Form useFormReturn={useFormReturn} onSubmit={handleVideoOnSubmit}>
      <h3 className="font-bold">360 Video</h3>

      <div className="mt-4 space-y-4">
        <Form.Input label="Video Name" name="documentName" />
        <Form.Input label="Video Link" name="documentPath" />
        <FileStack
          setAttachmentId={setThumbNailId}
          files={videoFiles}
          setFiles={setVideoFiles}
          isSingleFile={true}
          label="Thumbnail"
          maxFileUpload={MaxFileUpload.minFile}
          imageError={imageError}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" className="ml-auto">
          Save Video
        </Button>
      </div>
    </Form>
  );
};

export default VideoForm;
