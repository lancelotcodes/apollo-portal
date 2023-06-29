import { useFormContext } from 'react-hook-form';
import Input, { InputProps } from '../Input';
import React from 'react';

type FormInputProps = InputProps;

const FormInput: React.FC<FormInputProps> = ({ name, error, ...rest }) => {
  const {
    getValues,
    formState: { errors },
    register,
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
    />
  );
};

export default FormInput;
