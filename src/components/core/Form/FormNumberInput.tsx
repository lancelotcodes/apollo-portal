import { useFormContext } from 'react-hook-form';
import Input, { InputProps } from '../Input';
import React from 'react';
import { numberFormat } from '@/helpers/numberFormat';

type FormNumberInputProps = InputProps;

const FormNumberInput: React.FC<FormNumberInputProps> = ({ name, error, ...rest }) => {
  const {
    getValues,
    formState: { errors },
    register,
    setValue,
  } = useFormContext();

  if (!name) {
    return null;
  }

  const { ref, ...reg } = register(name);

  return (
    <Input
      error={(name && errors[name]?.message) || error}
      innerRef={ref}
      defaultValue={getValues(name)}
      {...rest}
      {...reg}
      onChange={(e) => {
        e.target.value && setValue(name, numberFormat(parseFloat(e.target.value.replace(/\D/g, ''))));
      }}
    />
  );
};

export default FormNumberInput;
