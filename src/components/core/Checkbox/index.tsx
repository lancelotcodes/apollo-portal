import { FCC } from '@/helpers/FCC';
import React from 'react';
import { RefCallBack } from 'react-hook-form';

interface Props {
  title?: string;
}

const Checkbox: FCC<Props> = ({ title, children }) => {
  return (
    <fieldset className="space-y-3">
      {title && <h3 className="font-bold">{title}</h3>}

      {children}
    </fieldset>
  );
};

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type CheckboxItemProps = Omit<InputProps, 'id' | 'type'>;

export interface CheckboxProps extends CheckboxItemProps {
  label: string | JSX.Element;
  description?: string;
  name: string;
  error?: string;
  title?: string;
  innerRef?: RefCallBack;
}

const Item: FCC<CheckboxProps> = ({ label, name, description, innerRef, ...rest }) => {
  return (
    <fieldset className="space-y-3">
      <div className="relative flex items-center">
        <div className="flex items-center h-5">
          <input
            id={name}
            aria-describedby={`${label}-description`}
            name={name}
            type="checkbox"
            className="transition-all focus:ring-blue-6 h-4 w-4 text-blue-6 border-gray-300 rounded duration-75"
            {...rest}
            ref={innerRef}
          />
        </div>

        <div className="ml-2 typography-body">
          {typeof label === 'string' ? (
            <label htmlFor={name} className="text-gray-7">
              {label}
            </label>
          ) : (
            label
          )}
          {description && (
            <p id="comments-description" className="text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default Object.assign(Checkbox, { Item });
