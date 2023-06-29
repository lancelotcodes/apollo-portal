import { toast } from 'react-toastify';

function HandleNotification(message: string | number, isSuccess: boolean) {
  const toastGeneric = isSuccess === true ? toast.success : toast.error;
  toastGeneric(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}

export { HandleNotification };
