import React from 'react';
interface Props {
  setHandleFileImport?: React.Dispatch<React.SetStateAction<any> | null>;
}
const SimpleUpload: React.FC<Props> = ({ setHandleFileImport }) => {
  return (
    <input
      type="file"
      name="file"
      id="formFile"
      onChange={(e) => setHandleFileImport && setHandleFileImport(e)}
      className="block w-full text-sm file:bg-white text-gray-7 file:py-2 file:px-3 file:rounded file:border-gray-blue-3 file:border-gray-blue-3"
    />
  );
};

export default SimpleUpload;
