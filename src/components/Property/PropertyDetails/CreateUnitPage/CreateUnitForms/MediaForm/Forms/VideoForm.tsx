import Button from '@/components/core/Button';
import FileStack from '@/components/core/Filestack';
import Form from '@/components/core/Form';
import { MaxFileUpload } from '@/constant/FileUploadOption';
import { saveVideoResolver } from '@/form-resolvers/create-property/save-video-resolver';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { PropertyVideoRequest, PropertyVideoResponse } from '@/infrastructure/store/api/property/property-type';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  onSubmitVideo: SubmitHandler<PropertyVideoRequest>;
  setThumbNailId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  videoFiles: FileResponse[];
  setVideoFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  videoInfo?: PropertyVideoResponse | undefined;
}
const VideoForm: React.FC<Props> = ({ onSubmitVideo, setThumbNailId, videoInfo, videoFiles, setVideoFiles }) => {
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
    <Form useFormReturn={useFormReturn} onSubmit={onSubmitVideo} className="w-full flex-1 flex flex-col">
      <h3 className="font-bold">360 Video</h3>
      <div className="mt-4 space-y-4">
        <Form.Input label="Video Name" name="documentName" />
        <Form.Input label="Video Link" name="documentPath" />
        <FileStack
          label="Thumbnail"
          setAttachmentId={setThumbNailId}
          files={videoFiles}
          setFiles={setVideoFiles}
          isSingleFile={true}
          maxFileUpload={MaxFileUpload.minFile}
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
