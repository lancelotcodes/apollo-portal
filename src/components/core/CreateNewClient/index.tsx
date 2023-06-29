import React, { useEffect } from 'react';
import Dialog from '@/components/core/Dialog';
import {
  toggleCreateNewClientDialog,
  toggleCreateNewItemDialog,
} from '@/infrastructure/store/features/property-list/property-list-slice';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useDispatch } from 'react-redux';
import { AddCompanyForm, AddContactForm } from '@/components/Offer-Generation/SendOfferDialog';

function CreateNewClientDialog() {
  const { createNewClientDialogOpen, newClientTypeName } = useAppSelector(
    (state) => state['property-list'].createNewClientTypeToggle,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleCreateNewItemDialog(false));
  }, [dispatch, createNewClientDialogOpen]);
  return (
    <Dialog
      size="md"
      title={`Create New ${newClientTypeName}`}
      modalState={createNewClientDialogOpen}
      closeDialog={() =>
        dispatch(
          toggleCreateNewClientDialog({
            createNewClientDialogOpen: false,
            newClientTypeName: '',
          }),
        )
      }
    >
      {createNewClientDialogOpen && newClientTypeName === 'Company' && <AddCompanyForm />}
      {createNewClientDialogOpen && newClientTypeName === 'Contact' && <AddContactForm />}
    </Dialog>
  );
}

export default CreateNewClientDialog;
