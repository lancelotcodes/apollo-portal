import React from 'react';
import { useFormContext } from 'react-hook-form';
import Radio, { RadioProps } from '../Radio';

const FormRadio: React.FC<RadioProps> = ({ name, ...rest }) => {
  const { watch, register, setValue } = useFormContext();

  if (!name) {
    return null;
  }

  const { ref: _, ...reg } = register(name);

  return <Radio {...rest} {...reg} value={watch(name)} onChange={(e) => setValue(name, e.currentTarget.id)} />;
};

export default FormRadio;
