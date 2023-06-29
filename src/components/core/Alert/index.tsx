import { FCC } from '@/helpers/FCC';
import React from 'react'
import Button from '../Button'
import Dialog from '../Dialog'

interface Props {
  dialogTitle: string;
  isDialogOpen: boolean
  handleCloseDialog: () => void;
  handleConfirmDialog: () => void;
}

const AlertBox: FCC<Props> = ({ dialogTitle, isDialogOpen, handleConfirmDialog, handleCloseDialog, children }) => {
  return (
    <Dialog size="md" className="px-6 pt-5 pb-6" closeDialog={handleCloseDialog} modalState={isDialogOpen} title={dialogTitle}>
      <div className="text-start">
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {children}
        </h3>
        <div className="flex justify-end mt-4">
          <Button
            type="button"
            className="ml-2 leading-3 px-10 !bg-gray-2 !text-gray-800 !border-2 border-blue-5 hover:!bg-gray-2 focus:!bg-gray-2 focus:!border-gray-2 hover:!border-gray-2"
            onClick={handleCloseDialog}
          >
            {'No'}
          </Button>
          <Button
            type="submit"
            className="ml-2 leading-3 px-10 bg-blue focus:!bg-red active:bg-red hover:!bg-red"
            onClick={handleConfirmDialog}
          >
            {'Yes'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default AlertBox