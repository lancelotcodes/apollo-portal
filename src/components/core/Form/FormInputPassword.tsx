import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Input, { InputProps } from '../Input';

type FormInputPasswordProps = InputProps;

const FormInputPassword: React.FC<FormInputPasswordProps> = ({ name, ...rest }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    getValues,
    formState: { errors },
    register,
  } = useFormContext();

  if (!name) {
    return null;
  }

  const { ref, ...reg } = register(name);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      error={errors?.[name]?.message}
      innerRef={ref}
      defaultValue={getValues(name)}
      {...rest}
      {...reg}
      type={!showPassword ? 'password' : 'text'}
      trailing={
        <button type="button" className="p-1.5 absolute right-1 top-1/2 -translate-y-1/2" onClick={toggleShowPassword}>
          {!showPassword ? (
            <HiEye onClick={toggleShowPassword} className="h-5 w-5" />
          ) : (
            <HiEyeOff onClick={toggleShowPassword} className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
};

export default FormInputPassword;
