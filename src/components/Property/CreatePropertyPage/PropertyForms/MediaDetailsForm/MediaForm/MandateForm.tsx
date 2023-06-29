import FileStack from '@/components/core/Filestack';
import Form from '@/components/core/Form';
import { saveMandateResolver } from '@/form-resolvers/create-property/save-mandate-resolver';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { PropertyMandateResponse } from '@/infrastructure/store/api/property/property-type';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import Button from '@/components/core/Button';
import { useForm } from 'react-hook-form';
import { MaxFileUpload } from '@/constant/FileUploadOption';

interface Props {
  handleMandateOnSubmit: any;
  setAttachmentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  mandateInfo: PropertyMandateResponse | undefined;
  mandateFiles: FileResponse[];
  setMandateFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
}

const MandateForm: React.FC<Props> = ({
  handleMandateOnSubmit,
  setAttachmentId,
  mandateInfo,
  mandateFiles,
  setMandateFiles,
}) => {
  const useFormReturn = useForm({
    defaultValues: mandateInfo,
    resolver: yupResolver(saveMandateResolver),
  });
  const { reset } = useFormReturn;

  useEffect(() => {
    // Reset default value in the form's (Mandate form)
    if (mandateInfo) {
      reset(mandateInfo);
    }
  }, [mandateInfo, reset]);
  return (
    <Form useFormReturn={useFormReturn} onSubmit={handleMandateOnSubmit} className="w-full flex-1 flex flex-col">
      <div className="p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2">
        <h3 className="font-bold">Mandate Details</h3>

        <div className="mt-4 space-y-4">
          <FileStack
            label="Attachment"
            setAttachmentId={setAttachmentId}
            files={mandateFiles}
            setFiles={setMandateFiles}
            isSingleFile={true}
            maxFileUpload={MaxFileUpload.minFile}
          />
          <Form.Input label="Name" name="name" />
          <Form.Datepicker label="Start Date" name="startDate" />
          <Form.Datepicker label="End Date" name="endDate" />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" className="ml-auto">
            Save Mandate
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default MandateForm;
