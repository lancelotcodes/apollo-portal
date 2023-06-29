import React from 'react';
import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { createPropertyResolver } from '@/form-resolvers/create-property';
import { FCC } from '@/helpers/FCC';
import {
  CompanyDetails,
  ContactDetails,
  CreatePropertyRequest,
  GradeDetails,
  PropertyShort,
  PropertyTypeDetails,
} from '@/infrastructure/store/api/property/property-type';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';
import { SingleValue } from 'react-select';

interface Props {
  masterProperties: PropertyShort[] | undefined;
  owners: ContactDetails[] | undefined;
  grades: GradeDetails[] | undefined;
  companies: CompanyDetails[] | undefined;
  propertyTypes: PropertyTypeDetails[] | undefined;
  contacts: ContactDetails[] | undefined;
  initialValue: CreatePropertyRequest | undefined;
  onSubmit: SubmitHandler<CreatePropertyRequest>;
  handleSelectPropertyType: (
    newValue: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<CreatePropertyRequest>,
  ) => void;
  inputClassName?: string;
  formColClassName?: string;
  formColInnerClassName?: string;
  formColInnerTwoClassName?: string;
  formCardBorderClassName?: string;
  isStepForm?: boolean;
  handleTabPropertyForm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  propertyTypeId?: number;
}

const PropertyDetailsForm: FCC<Props> = ({
  masterProperties,
  owners,
  grades,
  companies,
  propertyTypes,
  contacts,
  initialValue,
  handleSelectPropertyType,
  onSubmit,
  inputClassName,
  formColClassName,
  formColInnerClassName,
  formColInnerTwoClassName,
  formCardBorderClassName,
  isStepForm,
  handleTabPropertyForm,
  propertyTypeId,
}) => {
  const useFormReturn = useForm<CreatePropertyRequest>({
    defaultValues: initialValue,
    resolver: yupResolver(createPropertyResolver),
  });

  const { setValue, reset } = useFormReturn;

  useEffect(() => {
    // Reset default value in form
    if (initialValue) {
      reset(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmit} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div
          className={classNames('p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2', formCardBorderClassName)}
        >
          {!isStepForm && <h3 className="font-bold">Property Details</h3>}

          <div className={classNames('mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0', formColClassName)}>
            <div className={classNames('md:w-1/2 space-y-4', formColInnerClassName)}>
              <Form.Input label="Name" name="name" inputClassName={inputClassName} />
              <Form.Select
                label="Property Type"
                name="propertyTypeID"
                isSearchable
                options={propertyTypes?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
                onChange={(e) => handleSelectPropertyType(e, setValue)}
              />
              <Form.Select
                label="Grade"
                name="gradeID"
                options={grades?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
                cascadeId={propertyTypeId}
              />

              <Form.Select
                label="Master Property"
                name="masterPropertyID"
                isClearable
                options={masterProperties?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.TextArea label="Notes" name="note" />
            </div>

            <div className={classNames('md:w-1/2', formColInnerTwoClassName)}>
              <Form.Select
                label="Owner"
                name="ownerID"
                options={owners?.map((option) => ({
                  value: option.id,
                  name: `${option.firstName} ${option.lastName}`,
                }))}
              />

              <Form.Select
                label="Owner Company Name"
                name="ownerCompanyID"
                options={companies?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />

              <Form.Select
                label="Contact"
                name="contactID"
                options={contacts?.map((option) => ({
                  value: option.id,
                  name: `${option.firstName} ${option.lastName}`,
                }))}
              />
              <Form.Checkbox label="Exclusive" name="isExclusive" />
            </div>
          </div>
          {isStepForm && (
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
          )}
        </div>
      </section>
      {!isStepForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex">
            <Button className="ml-auto" suffix={<ChevronRightIcon className="h-6 w-5" />}>
              NEXT STEP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default PropertyDetailsForm;
