import React from 'react';
import { useFormContext } from 'react-hook-form';
import Textarea, { TextareaProps } from '../TextArea';

type FormTextareaProps = TextareaProps;

const FormTextarea: React.FC<FormTextareaProps> = ({ name, error, ...rest }) => {
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
    <Textarea
      error={(name && errors[name]?.message) || error}
      innerRef={ref}
      defaultValue={getValues(name)}
      {...rest}
      {...reg}
    />
  );
};

export default FormTextarea;
