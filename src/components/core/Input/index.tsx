import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { HTMLInputTypeAttribute } from 'react';
import React from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type?: HTMLInputTypeAttribute | undefined;
  leading?: string | undefined | JSX.Element;
  trailing?: string | undefined | JSX.Element;
  className?: string;
  inputClassName?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  caption?: string;
  showErrorMessage?: boolean;
  innerRef?: React.LegacyRef<HTMLInputElement>;
  optional?: boolean;
}

const Input: FCC<InputProps> = ({
  label,
  name,
  innerRef,
  optional,
  className,
  inputClassName,
  leading,
  trailing,
  error,
  caption,
  ...rest
}) => {
  return (
    <div className={classNames('flex flex-col', className && className)}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="typography-label font-medium text-gray-7" htmlFor={name}>
            {label}
          </label>
        )}

        {optional && <span className="typography-caption font-medium text-gray-5">Optional</span>}
      </div>

      <div className="relative flex w-full">
        {leading && (
          <span className="text-sm text-blue-6 font-medium z-10 pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            {leading}
          </span>
        )}

        <input
          name={name}
          ref={innerRef}
          className={classNames(
            'border relative appearance-none text-base w-full text-gray-9 transition-all my-1 rounded py-0.5 outline-none focus:ring hover:ring focus:ring-blue-3 disabled:bg-gray-2 bg-gray-blue-1',
            leading ? 'pl-11' : 'pl-2',
            trailing ? 'pr-9' : 'pr-2',
            error ? 'border-red' : 'border-gray-blue-3',
            inputClassName && inputClassName,
          )}
          {...rest}
        />

        {trailing && (
          <span className="text-sm text-blue-6 font-medium z-10 pointer-events-none absolute inset-y-0 right-3 pl-3 flex items-center">
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

export default Input;
