import React, { useEffect, useState } from 'react';
import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { FCC } from '@/helpers/FCC';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveBuildingResolver } from '@/form-resolvers/create-property';
import { BuildingDetails, SavePropertyBuildingRequest } from '@/infrastructure/store/api/property/property-type';
import { classNames } from '@/helpers/classNames';
import { DropdownOption } from '@/constant/DropdownOptions';
import { getDateonlyYear } from '@/helpers/date-format';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import { numberFormat } from '@/helpers/numberFormat';
import { useCompanyListQuery } from '@/infrastructure/store/api/company/company-api';
interface Props {
  owners: ISelectOption[] | undefined;
  projectStatus: ISelectOption[] | undefined;
  onSubmit: SubmitHandler<SavePropertyBuildingRequest>;
  initialValue: BuildingDetails | undefined;
  goToNextStep?: () => void;
  goToPrevStep?: () => void;
  isStepForm?: boolean | null;
  inputClassName?: string;
  formColClassName?: string;
  formColInnerClassName?: string;
  formCardBorderClassName?: string;
  handleTabPropertyForm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const BuildingDetailsForm: FCC<Props> = ({
  owners,
  projectStatus,
  onSubmit,
  initialValue,
  goToPrevStep,
  isStepForm,
  inputClassName,
  formColClassName,
  formColInnerClassName,
  formCardBorderClassName,
  handleTabPropertyForm,
}) => {
  const useFormReturn = useForm<BuildingDetails>({
    resolver: yupResolver(saveBuildingResolver),
    defaultValues: initialValue,
  });

  const { reset, setValue } = useFormReturn;

  // get build year on dateBuild selection
  const [buildYear, setBuildYear] = useState<number | string | undefined>(
    initialValue && initialValue?.yearBuilt ? initialValue?.yearBuilt : getDateonlyYear(new Date()),
  );

  const { data: companyList } = useCompanyListQuery(null);

  useEffect(() => {
    // Reset default value in the form's and add a number format in the field specified with that format.
    if (initialValue) {
      reset({
        ...initialValue,
        grossBuildingSize:
          initialValue?.grossBuildingSize && numberFormat(parseFloat(initialValue?.grossBuildingSize.toString())),
        grossLeasableSize:
          initialValue?.grossLeasableSize && numberFormat(parseFloat(initialValue?.grossLeasableSize.toString())),
        typicalFloorPlateSize:
          initialValue?.typicalFloorPlateSize &&
          numberFormat(parseFloat(initialValue?.typicalFloorPlateSize.toString())),
      });
    }

    // set build year (e.g 2023)
    buildYear !== undefined &&
      setValue(
        'yearBuilt',
        typeof buildYear === 'number' ? initialValue?.yearBuilt : buildYear && getDateonlyYear(buildYear),
      );
    const propertyName = SessionUtils.getItem(SessionOptions.propertyName);
    setValue('name', initialValue?.name ? initialValue?.name : propertyName);
  }, [reset, initialValue, setValue, buildYear]);
  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmit} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div
          className={classNames('p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2', formCardBorderClassName)}
        >
          {!isStepForm && <h3 className="font-bold">Building Details</h3>}

          <div className={classNames('mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0', formColClassName)}>
            <div className={classNames('md:w-1/2 space-y-4', formColInnerClassName)}>
              <Form.Input label="Name" name="name" inputClassName={inputClassName} />
              <Form.Datepicker label="Date Build" name="dateBuilt" setBuildYear={setBuildYear} />
              <Form.Input label="Built Year" name="yearBuilt" type="text" inputClassName={inputClassName} />
              <Form.Select label="Peza" name="peza" options={DropdownOption.PEZAStatus} />
              <Form.Input label="Leed" name="leed" inputClassName={inputClassName} />
              <Form.Datepicker label="Turn Over Date" name="turnOverDate" />
              <Form.Input label="Tenant Mix" name="tenantMix" inputClassName={inputClassName} />
              <Form.NumberInput
                label="Gross Building Size"
                name="grossBuildingSize"
                inputClassName={inputClassName}
                trailing="SQM"
              />
              <Form.NumberInput
                label="Gross Leasable Size"
                name="grossLeasableSize"
                inputClassName={inputClassName}
                trailing="SQM"
              />
              <Form.NumberInput
                label="Typical Floor Plate Size"
                name="typicalFloorPlateSize"
                trailing="SQM"
                inputClassName={inputClassName}
              />
              <Form.Input label="Total Floors" name="totalFloors" inputClassName={inputClassName} />
              <Form.Input label="Total Units" name="totalUnits" inputClassName={inputClassName} />
              <Form.Input label="Efficiency Ratio (%)" name="efficiencyRatio" inputClassName={inputClassName} />
              <Form.Input label="Ceiling Height" name="ceilingHeight" inputClassName={inputClassName} />
              <Form.Input label="Minimum Lease Term (Month)" name="minimumLeaseTerm" inputClassName={inputClassName} />
              <Form.Input label="Elevator" name="elevators" inputClassName={inputClassName} />
              <Form.Input label="Power" name="power" inputClassName={inputClassName} />
              <Form.Input label="AC System" name="acSystem" inputClassName={inputClassName} />
            </div>

            <div className={classNames('md:w-1/2', formColInnerClassName)}>
              <Form.Input label="Telcos" name="telcos" inputClassName={inputClassName} />
              <Form.Input label="Amenities" name="amenities" inputClassName={inputClassName} />
              <Form.Input label="Web Page" name="webPage" inputClassName={inputClassName} />
              <Form.Input label="Density Ratio (%)" name="densityRatio" inputClassName={inputClassName} />
              <Form.Input label="Parking Elevator" name="parkingElevator" inputClassName={inputClassName} />
              <Form.Input label="Passenger Elevator" name="passengerElevator" inputClassName={inputClassName} />
              <Form.Input label="Service Elevator" name="serviceElevator" inputClassName={inputClassName} />
              <Form.Select
                label="Leasing Contact"
                name="leasingContactID"
                options={companyList?.data?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Developer"
                name="developerID"
                options={companyList?.data?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Property Management"
                name="propertyManagementID"
                options={companyList?.data?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Ownership Type"
                name="ownershipTypeID"
                options={owners?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Project Status"
                name="projectStatusID"
                options={projectStatus?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Checkbox label="24/7" name="operatingHours" />
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
          <div className="flex justify-between">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            <Button className="ml-auto" suffix={<ChevronRightIcon className="h-6 w-5" />}>
              NEXT STEP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default BuildingDetailsForm;
