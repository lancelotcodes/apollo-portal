import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import FormRadio from './FormRadio';
import { FormSelect } from './FormSelect';
import FormTextarea from './Form.Textarea';
import FormCheckbox from './FormCheckbox';
import FormDatepicker from './FormDatepicker';
import FormNumberInput from './FormNumberInput';

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  useFormReturn: UseFormReturn<any, object>;
  onSubmit: (e: any) => void;
  name?: string;
}

const Form: React.FC<FormProps> = ({ useFormReturn, name, onSubmit, children, ...rest }) => {
  const { handleSubmit } = useFormReturn;

  return (
    <FormProvider {...useFormReturn}>
      <form name={name} onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Object.assign(Form, {
  Input: FormInput,
  NumberInput: FormNumberInput,
  InputPassword: FormInputPassword,
  Radio: FormRadio,
  TextArea: FormTextarea,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Datepicker: FormDatepicker,
});
