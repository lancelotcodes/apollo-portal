import React from 'react';
import Dialog from '@/components/core/Dialog';
import {
  toggleCreateNewItemDialog,
  toggleCreateNewClientDialog,
} from '@/infrastructure/store/features/property-list/property-list-slice';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useDispatch } from 'react-redux';
import { AccountIcon, LocationIcon, PropertyIcon } from '@/components/core/Icon';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import { StepsValidationWithOutBuilding } from '@/constant/StepsValidation';
import { useNavigate } from 'react-router-dom';
import { navChanged } from '@/infrastructure/store/features/app/app-slice';

function CreateNewItemDialog() {
  const { createNewItemDialogOpen } = useAppSelector((state) => state['property-list']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateCreateProperty = () => {
    SessionUtils.removeItem(SessionOptions.propertyId);
    SessionUtils.removeItem(SessionOptions.propertyName);
    SessionUtils.setItem('isStepValidated', JSON.stringify(StepsValidationWithOutBuilding));
    navigate('/create-property');
    dispatch(toggleCreateNewItemDialog(false));
    dispatch(navChanged('/property'));
  };
  return (
    <Dialog
      size="xl"
      title="Create new item"
      modalState={createNewItemDialogOpen}
      closeDialog={() => dispatch(toggleCreateNewItemDialog(false))}
    >
      <div className="grid grid-cols-3 gap-4 flex">
        <div
          onClick={handleNavigateCreateProperty}
          onKeyPress={handleNavigateCreateProperty}
          role="link"
          tabIndex={0}
          className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <PropertyIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'Property'}</h3>
          </div>
        </div>
        <div className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <PropertyIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'Unit'}</h3>
          </div>
        </div>
        <div
          onClick={() =>
            dispatch(
              toggleCreateNewClientDialog({
                createNewClientDialogOpen: true,
                newClientTypeName: 'Company',
              }),
            )
          }
          onKeyPress={() =>
            dispatch(
              toggleCreateNewClientDialog({
                createNewClientDialogOpen: true,
                newClientTypeName: 'Company',
              }),
            )
          }
          role="link"
          tabIndex={0}
          className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <PropertyIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'Company'}</h3>
          </div>
        </div>
        <div className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <AccountIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'User'}</h3>
          </div>
        </div>
        <div className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <LocationIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'Location'}</h3>
          </div>
        </div>
        <div
          onClick={() =>
            dispatch(
              toggleCreateNewClientDialog({
                createNewClientDialogOpen: true,
                newClientTypeName: 'Contact',
              }),
            )
          }
          onKeyPress={() =>
            dispatch(
              toggleCreateNewClientDialog({
                createNewClientDialogOpen: true,
                newClientTypeName: 'Contact',
              }),
            )
          }
          role="link"
          tabIndex={0}
          className="h-32 border border-gray-blue-2 bg-blue-1 hover:border-gray-blue-7 rounded cursor-pointer flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <PropertyIcon />
            <h3 className="cursor-pointer font-bold text-gray-blue-9">{'Contact'}</h3>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CreateNewItemDialog;
