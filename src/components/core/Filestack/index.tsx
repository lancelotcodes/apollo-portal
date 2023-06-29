import { PropertyDocumentType } from '@/constant/DocumentTypes';
import { CheckFileType } from '@/constant/FileUploadOption';
import { classNames } from '@/helpers/classNames';
import { useDialogState } from '@/hooks/useDialogState';
import { useDeleteDocumentByIdMutation, useSaveDocumentMutation } from '@/infrastructure/store/api/files/files-api';
import { FileResponse } from '@/infrastructure/store/api/files/files-type';
import { PickerOverlay } from 'filestack-react';
import React from 'react';
import AlertBox from '../Alert';
import Button from '../Button';
import { TrashIcon } from '../Icon';
import DocumentFileIcon from '../Icon/app-wide/DocumentIcon';
import { HandleNotification } from '../ToastAlert';

interface UploadProps {
  label?: string;
  documentType?: number;
  onSuccess?: () => void;
  setAttachmentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  files: FileResponse[];
  setFiles: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  isSingleFile: boolean;
  isMainPrimary?: boolean;
  isFloorPrimary?: boolean;
  maxFileUpload?: number;
  imageError?: string;
}

const FileStack: React.FC<UploadProps> = ({
  label,
  setAttachmentId,
  files,
  setFiles,
  isSingleFile,
  documentType,
  isMainPrimary,
  isFloorPrimary,
  maxFileUpload,
  imageError,
}) => {
  const [isPicker, setIsPicker] = React.useState(false);
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const [saveFile] = useSaveDocumentMutation();

  const handleSuccessResponse = async (result: any) => {
    console.log('fileresult', result);
    if (result) {
      const response = await saveFile({ documents: result?.filesUploaded }).unwrap();
      setAttachmentId && setAttachmentId(response?.data[0].id);
      if (isSingleFile) {
        setFiles(response?.data);
      } else if (documentType) {
        const newData = response.data.map((y) => {
          return { ...y, documentType: documentType };
        });
        setFiles([...files, ...newData]);
      } else {
        setFiles((previous: any) => [...previous, response?.data]);
      }
    }
  };
  const [deleteFile] = useDeleteDocumentByIdMutation();

  const handleDeleteFile = async (file: FileResponse) => {
    const res = await deleteFile(file.id).unwrap();
    if (res.success) {
      const filterData = files.filter((x) => x.id !== file.id);
      setFiles(filterData);
      HandleNotification('File deleted successfully', res.success);
      setCloseDialog();
    }
  };
  const handleIsMainPrimary = (file: FileResponse) => {
    setFiles((previous) =>
      previous?.map((item) => {
        if (item.id === file.id && file.documentType === PropertyDocumentType.MainImage) {
          return { ...item, isPrimary: true };
        }
        if (item.id !== file.id) {
          if (item.documentType !== file.documentType) {
            return { ...item };
          } else {
            return { ...item, isPrimary: false };
          }
        }
        return item;
      }),
    );
  };
  const handleIsFloorPrimary = (file: FileResponse) => {
    setFiles((previous) =>
      previous?.map((item) => {
        if (item.id === file?.id && file?.documentType === PropertyDocumentType.FloorPlanImage) {
          return { ...item, isPrimary: true };
        }
        if (item.id !== file?.id) {
          if (item.documentType !== file?.documentType) {
            return { ...item };
          } else {
            return { ...item, isPrimary: false };
          }
        }
        return item;
      }),
    );
  };

  const ImagesFiles = documentType ? files.filter((x) => x.documentType && x.documentType === documentType) : files;
  const acceptedFileItems = ImagesFiles?.map((file, index) => {
    const documentExtension = CheckFileType(file?.documentName);
    return (
      <li className="flex justify-between items-center  p-4 bg-gray-1 rounded" key={index}>
        <div className={`gap-2 flex `}>
          <div className="flex flex-col">
            <span className="typography-label text-gray-5 font-medium">Action</span>
            <div className="flex">
              <button
                type="button"
                onClick={setOpenDialog}
                className={`${file?.isPrimary ? 'text-gray-6' : 'text-red'}`}
                disabled={file.isPrimary}
              >
                <TrashIcon />
              </button>
              <AlertBox
                dialogTitle={'Delete File'}
                isDialogOpen={isOpen}
                handleConfirmDialog={() => handleDeleteFile(file)}
                handleCloseDialog={setCloseDialog}
              >
                {'Are you sure you want to delete this item?'}
              </AlertBox>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="h-10 w-10 border rounded border-gray-3 flex justify-center items-center">
              {documentExtension === 'docx' ||
              documentExtension === 'doc' ||
              documentExtension === 'pdf' ||
              documentExtension === 'xls' ||
              documentExtension === 'xlsx' ? (
                <DocumentFileIcon />
              ) : (
                <img className="h-full" src={file?.documentPath} alt="Property" />
              )}
            </span>

            <span className="flex flex-col justify-between">
              <span className="typography-label font-medium text-gray-5">File name</span>
              <span className="typography-caption font-medium text-gray-7">{file.documentName}</span>
            </span>
          </div>
        </div>
        {isMainPrimary && (
          <div>
            <input
              type="radio"
              name="isMainPrimary"
              id={`${file.id}`}
              value="isPrimary"
              className="peer hidden"
              onClick={() => handleIsMainPrimary(file)}
              checked={file.isPrimary && file.documentType === PropertyDocumentType.MainImage ? true : false}
            />
            <label
              htmlFor={`${file.id}`}
              className="block cursor-pointer select-none rounded-xl px-3 py-0.5 bg-gray-200 text-center hover:text-white hover:bg-blue-600 peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
            >
              Primary
            </label>
          </div>
        )}
        {isFloorPrimary && (
          <div>
            <input
              type="radio"
              name="isFloorPrimary"
              id={`${file.id}`}
              value="isPrimary"
              className="peer hidden"
              checked={file.isPrimary && file.documentType === PropertyDocumentType.FloorPlanImage ? true : false}
              onClick={() => handleIsFloorPrimary(file)}
            />
            <label
              htmlFor={`${file.id}`}
              className="block cursor-pointer select-none rounded-xl px-3 py-0.5 text-center bg-gray-200 hover:text-white hover:bg-blue-600 peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
            >
              Primary
            </label>
          </div>
        )}
      </li>
    );
  });

  return (
    <section className="container">
      {label && <p className="typography-label text-gray-7 font-medium">{label}</p>}
      <div className="flex mt-1 justify-between  items-center gap-4">
        <Button btnType="secondary-gray" type="button" onClick={() => setIsPicker(true)}>
          SELECT FILES
        </Button>
        <p className="typography-caption font-medium mr-auto">No File Selected</p>
      </div>
      {imageError && files.length === 0 && (
        <span className={classNames('text-red typography-label')}>{imageError || ''}</span>
      )}

      {ImagesFiles !== undefined && (
        <aside className="mt-2">
          <ul className="space-y-2">{acceptedFileItems}</ul>
        </aside>
      )}
      {isPicker && (
        <PickerOverlay
          apikey={import.meta.env.VITE_PORTAL_FILE_STACK_API_KEY}
          onSuccess={(res: any) => {
            console.log(res);
            setIsPicker(false);
          }}
          onUploadDone={handleSuccessResponse}
          pickerOptions={{
            onClose: () => {
              setIsPicker(false);
            },
            fromSources: ['local_file_system'],
            maxFiles: maxFileUpload,
          }}
        />
      )}
    </section>
  );
};

export default FileStack;
