import React, { ChangeEvent, useState } from 'react';
import Button from '@/components/core/Button';
import Dialog from '@/components/core/Dialog';
import { toggleImportStackingPlanDialog } from '@/infrastructure/store/features/property-details/property-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import SimpleUpload from '@/components/core/SimpleUpload';
import { ImportFile } from '@/infrastructure/store/api/axios/file-api';
import { EndPoint } from '@/infrastructure/store/api/axios/end-points';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { appApi } from '@/infrastructure/store/api';

const ImportStackingPlan = () => {
  const [loading, setLoading] = useState(false);
  const [handleFileImport, setHandleFileImport] = useState<ChangeEvent<HTMLInputElement> | null>(null);
  const { importStackingPlanOpen } = useAppSelector((app) => app['property-details'].stacking);

  const dispatch = useAppDispatch();

  const handleCloseDialog = () => {
    dispatch(toggleImportStackingPlanDialog(false));
  };

  const handleStackingFileUpload = async () => {
    const formData = new FormData();
    if (handleFileImport?.target.files) {
      formData.append('file', handleFileImport.target.files[0]);
    }
    setLoading(true);
    await ImportFile(`${EndPoint.IMPORTSTACKINGPLAN}`, formData).then((response) => {
      HandleNotification(response.message, response.success);
      dispatch(appApi.util.invalidateTags([{ type: 'Stacking', id: `Building-Floors` }]));
      dispatch(appApi.util.invalidateTags([{ type: 'Stacking', id: `Building-Units` }]));
    });
    setLoading(false);
    handleCloseDialog();
  };
  return (
    <Dialog size="md" title="Import Stacking Plan" modalState={importStackingPlanOpen} closeDialog={handleCloseDialog}>
      <SimpleUpload setHandleFileImport={setHandleFileImport} />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center z-10">
          <Loader />
        </div>
      )}
      <div className="flex justify-end mt-4">
        <Button onClick={handleCloseDialog} btnType="secondary-gray">
          Cancel
        </Button>
        <Button onClick={handleStackingFileUpload} className="ml-1.5">
          Save
        </Button>
      </div>
    </Dialog>
  );
};
export default ImportStackingPlan;
