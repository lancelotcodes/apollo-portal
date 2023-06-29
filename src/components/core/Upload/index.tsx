import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { CgFile } from 'react-icons/cg';
import Button from '../Button';
import { EditIcon, TrashIcon, UploadIcon } from '../Icon';
import IconButton from '../IconButton';

interface UploadProps {
  label?: string;
  onUpload?: (e: FileWithPath[]) => void;
}

const Upload: React.FC<UploadProps> = ({ label, onUpload }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileToEdit, setFileToEdit] = useState<FileWithPath | null>();

  const handleDrop = useCallback(
    (e: FileWithPath[]) => {
      if (fileToEdit) {
        const newFiles = [...files, ...e];
        newFiles.splice(newFiles.indexOf(fileToEdit), 1);
        setFiles(newFiles);

        setFileToEdit(null);
        return;
      }

      setFiles((old) => [...old, ...e]);
    },
    [fileToEdit, files],
  );

  const { getInputProps, open } = useDropzone({
    multiple: true,
    onDropAccepted: handleDrop,
  });

  useEffect(() => {
    if (fileToEdit) {
      open();
    }

    return () => {
      setFileToEdit(null);
    };
  }, [fileToEdit, open]);

  const deleteFile = useCallback(
    (e: FileWithPath) => {
      const newFiles = [...files];
      newFiles.splice(newFiles.indexOf(e), 1);
      setFiles(newFiles);
    },
    [files],
  );

  const acceptedFileItems = files.map((file: FileWithPath) => (
    <li className="flex gap-4 p-4 bg-gray-1 rounded" key={file.path}>
      <div className="flex flex-col">
        <span className="typography-label text-gray-5 font-medium">Action</span>
        <div className="flex">
          <button type="button" onClick={() => deleteFile(file)} className="text-red">
            <TrashIcon />
          </button>
          <IconButton
            onClick={() => {
              setFileToEdit(file);
            }}
            type="button"
            className="text-gray-blue-6"
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="h-10 w-10 border rounded border-gray-3 flex justify-center items-center">
          <CgFile className="h-6 w-6 text-gray-5" />
        </span>

        <span className="flex flex-col justify-between">
          <span className="typography-label font-medium text-gray-5">File name</span>
          <span className="typography-caption font-medium text-gray-7">{file.name}</span>
        </span>
      </div>
    </li>
  ));

  return (
    <section className="container">
      {label && <p className="typography-label text-gray-7 font-medium">{label}</p>}

      <input {...getInputProps()} className="sr-only" />

      <div className="flex mt-1 justify-between  items-center gap-4">
        <Button btnType="secondary-gray" type="button" onClick={open}>
          SELECT FILES
        </Button>

        <p className="typography-caption font-medium mr-auto">No File Selected</p>

        <Button
          disabled={acceptedFileItems.length === 0}
          btnType="primary-black"
          icon={<UploadIcon />}
          type="button"
          onClick={() => {
            onUpload && onUpload(files);
          }}
        >
          <span className="hidden md:inline">UPLOAD</span>
        </Button>
      </div>

      {acceptedFileItems.length > 0 && (
        <aside className="mt-2">
          <ul className="space-y-2">{acceptedFileItems}</ul>
        </aside>
      )}
    </section>
  );
};

export default Upload;
