import React from "react";

export interface RadioOption {
  value: string | number;
  name: string;
  description?: string;
}

export interface RadioProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  options: RadioOption[];
  label?: string;
}

const Radio: React.FC<RadioProps> = ({ options, label, value, ...rest }) => {
  return (
    <fieldset>
      {label && (
        <legend className="block font-medium typography-label text-gray-7 mb-1">
          {label}
        </legend>
      )}

      <div className="space-y-1">
        {options.map((option) => (
          <div key={option.value} className="relative flex items-start py-1">
            <div className="flex h-5 items-center">
              <input
                id={option.value.toString()}
                aria-describedby={`${option.value}-description`}
                checked={value === option.value}
                type="radio"
                className="h-4 w-4 border-gray-300 text-blue-6 focus:ring-blue-6"
                {...rest}
              />
            </div>

            <div className="ml-3 text-sm">
              <label
                htmlFor={option.value.toString()}
                className="typography-body">
                {option.name}
              </label>

              {option.description && (
                <span
                  id={`${option.value}-description`}
                  className="text-gray-500">
                  {option.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default Radio;
