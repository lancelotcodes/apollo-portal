import { classNames } from '@/helpers/classNames';
import { Dialog as DialogComp, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { MdClose } from 'react-icons/md';

export interface DialogProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  modalState: boolean;
  closeDialog: () => void;
  title?: string;
  showCloseIcon?: boolean;
  size?: 'md' | 'lg' | 'xl' | 'xxl';
}

const Dialog: React.FC<DialogProps> = ({
  closeDialog,
  modalState,
  title,
  children,
  showCloseIcon = true,
  className,
  size = 'md',
}) => {
  return (
    <>
      <Transition appear show={modalState} as={Fragment}>
        <DialogComp as="div" className="fixed inset-0 z-30 overflow-y-auto" onClose={closeDialog}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogComp.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classNames(
                  'inline-block w-full p-8 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-sm max-w',
                  className && className,
                  dialogSize[size],
                )}
              >
                <div className="flex items-center justify-between mb-5">
                  {title && (
                    <DialogComp.Title as={`${size === 'md' ? 'h2' : 'h1'}`} className="font-bold">
                      {title}
                    </DialogComp.Title>
                  )}
                  <button className={classNames('', !showCloseIcon && 'opacity-0')} onClick={closeDialog}>
                    <MdClose className="h-6 w-6 text-gray-400 hover:text-gray-900 transition-all" />
                  </button>
                </div>

                <div>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </DialogComp>
      </Transition>
    </>
  );
};

export default Dialog;

const dialogSize = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  xxl: 'max-w-3xl',
};
