import { useState } from "react";

/**
 *
 * @returns methods used for implementing dialog (i.e. isOpen, setCloseDialog, setOpenDialog)
 */
export const useDialogState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setCloseDialog = () => setIsOpen(false);
  const setOpenDialog = () => setIsOpen(true);

  return { isOpen, setCloseDialog, setOpenDialog };
};
