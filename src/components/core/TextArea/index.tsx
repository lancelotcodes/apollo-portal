import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import React from 'react';

export interface TextareaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  leading?: string | undefined | JSX.Element;
  trailing?: string | undefined | JSX.Element;
  className?: string;
  inputClassName?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  caption?: string;
  showErrorMessage?: boolean;
  innerRef?: React.LegacyRef<HTMLTextAreaElement>;
  optional?: boolean;
}

const Textarea: FCC<TextareaProps> = ({
  label,
  name,
  innerRef,
  optional,
  className,
  inputClassName,
  leading,
  trailing,
  error,
  rows = 4,
  caption,
  ...rest
}) => {
  return (
    <div className={classNames('flex flex-col', className && className)}>
      {(label || optional) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="typography-label font-medium text-gray-7" htmlFor={name}>
              {label}
            </label>
          )}

          {optional && <span className="typography-caption font-medium text-gray-5">Optional</span>}
        </div>
      )}

      <div className="relative flex w-full">
        {leading && (
          <span className="text-sm text-gray-6 font-medium z-10 pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            {leading}
          </span>
        )}

        <textarea
          ref={innerRef}
          name={name}
          rows={rows}
          className={classNames(
            'border relative text-base w-full text-gray-9 transition-all my-1 rounded py-2 outline-none focus:ring hover:ring focus:ring-blue-3 disabled:bg-gray-2 bg-gray-blue-1',
            leading ? 'pl-9' : 'pl-2',
            trailing ? 'pr-9' : 'pr-2',
            error ? 'border-red' : 'border-gray-blue-3',
            inputClassName && inputClassName,
          )}
          {...rest}
        />

        {trailing && (
          <span className="text-sm text-gray-6 font-medium z-10 pointer-events-none absolute inset-y-0 right-2 pl-3 flex items-center">
            {trailing}
          </span>
        )}
      </div>

      {(error || caption) && (
        <span
          className={classNames(
            error ? 'text-red typography-label' : 'typography-caption text-gray-blue-5 font-medium',
          )}
        >
          {error || caption}
        </span>
      )}
    </div>
  );
};

export default Textarea;
