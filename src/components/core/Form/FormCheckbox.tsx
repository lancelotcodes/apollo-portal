import React from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox, { CheckboxProps } from '../Checkbox';

type FormCheckboxProps = CheckboxProps;

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, error, ...rest }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  if (!name) {
    return null;
  }

  const { ref, ...reg } = register(name);

  return (
    <Checkbox>
      <Checkbox.Item error={((name && errors[name]?.message) as string) || error} {...rest} {...reg} innerRef={ref} />
    </Checkbox>
  );
};

export default FormCheckbox;
