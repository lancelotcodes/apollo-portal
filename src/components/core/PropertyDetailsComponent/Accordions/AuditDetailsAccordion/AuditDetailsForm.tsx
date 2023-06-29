import React from 'react';
import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { FCC } from '@/helpers/FCC';
import {
  PropertySEORequest,
  PropertySEOResponse,
  PropertyTypeDetails,
} from '@/infrastructure/store/api/property/property-type';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';

interface Props {
  initialValue?: PropertySEOResponse | undefined;
  propertyTypes: PropertyTypeDetails[] | undefined;
  onSubmit: SubmitHandler<PropertySEORequest>;
  inputClassName?: string;
  formColClassName?: string;
  formColInnerClassName?: string;
  formCardBorderClassName?: string;
  propertyTypeId?: number;
  handleTabPropertyForm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const AuditDetailsForm: FCC<Props> = ({
  onSubmit,
  initialValue,
  inputClassName,
  formColClassName,
  formColInnerClassName,
  formCardBorderClassName,
  handleTabPropertyForm,
}) => {
  const useFormReturn = useForm<PropertySEOResponse>({
    defaultValues: initialValue,
  });
  const { reset } = useFormReturn;

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
  }, [initialValue, reset]);

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmit} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <h3 className="font-bold py-2">SEO Details</h3>
        <div
          className={classNames('p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2', formCardBorderClassName)}
        >
          <div className={classNames('mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0', formColClassName)}>
            <div className={classNames('md:w-1/2 space-y-4', formColInnerClassName)}>
              <Form.Input label="Page Title" name="pageTitle" inputClassName={inputClassName} />
              <Form.Input label="URL" name="url" inputClassName={inputClassName} />
              <Form.Input label="Meta Keyword" name="metaKeyword" inputClassName={inputClassName} />
              <Form.TextArea label="Description" name="pageDescription" />
              <Form.Input label="Featured Weight" name="featuredWeight" />
              <Form.Checkbox label="Featured" name="isFeatured" />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:divide-x space-y-4 md:space-y-0 md:space-x-4">
            <div className="md:w-full space-y-4 flex justify-center">
              <Button onClick={handleTabPropertyForm} btnType="secondary-gray" className="w-full">
                Cancel
              </Button>
            </div>
            <div className="md:w-full space-y-4 flex justify-center">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Form>
  );
};

export default AuditDetailsForm;
