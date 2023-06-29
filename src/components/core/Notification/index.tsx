import { classNames } from '@/helpers/classNames';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import React from 'react';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  type?: NotificationType;
  message?: string;
}

const Notification: React.FC<NotificationProps> = ({ type = 'success', message = 'Notification Message' }) => {
  return (
    <div className={classNames('p-8 border rounded-lg', typeToClassName[type])}>
      <div className="flex flex-col items-center gap-4">
        {type === 'success' && (
          <span className="flex items-center gap-2">
            <IoIosCheckmarkCircle className="h-6 w-6 text-green-4" />
            <h2 className="font-bold">Success</h2>
          </span>
        )}

        {type === 'error' && (
          <span className="flex items-center gap-2">
            <BsFillExclamationTriangleFill className="h-6 w-6 text-red" />
            <h2 className="font-bold">Error</h2>
          </span>
        )}
        <p className="typography-body">{message}</p>
      </div>
    </div>
  );
};

export default Notification;

const typeToClassName = {
  success: 'bg-green-2 border-green-4',
  error: 'bg-orange-1 border-red',
};
