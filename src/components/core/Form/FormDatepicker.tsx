import Daypicker, { DayPickerProps } from '@/components/Daypicker';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

const FormDatepicker: React.FC<DayPickerProps> = ({ name, ...rest }) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const handleChange = useCallback(
    (e?: Date) => {
      setValue(name, e);
    },
    [name, setValue],
  );

  if (!name) {
    return null;
  }

  return (
    <Daypicker
      name={name}
      error={errors[name]?.message as string}
      onSelect={handleChange}
      selected={getValues(name) ? new Date(getValues(name)) : undefined}
      {...rest}
    />
  );
};

export default FormDatepicker;
