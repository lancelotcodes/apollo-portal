import React, { useEffect } from 'react';
import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { FCC } from '@/helpers/FCC';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { AgentDetails, CompanyDetails, ContactDetails } from '@/infrastructure/store/api/property/property-type';
import {
  BuildingUnitById,
  PropertyContractRequest,
  PropertyContractsById,
} from '@/infrastructure/store/api/stacking/stacking-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { UnitStatusType } from '@/constant/UnitStatusType';
import { yupResolver } from '@hookform/resolvers/yup';
import { tenantDetailsResolver } from '@/form-resolvers/create-unit/tenant-details-resolver';
import { convertToLocalDate, convertToLocalFormat } from '@/helpers/date-format';
import { numberFormat } from '@/helpers/numberFormat';

interface Props {
  onSubmitTenant: SubmitHandler<PropertyContractRequest>;
  contractInfo?: PropertyContractsById | undefined;
  companyList?: CompanyDetails[];
  contactList?: ContactDetails[];
  agents?: AgentDetails[];
  unitDetails?: BuildingUnitById;
  tenantClassificationList?: ISelectOption[];
  contractListLength?: number;
  goToPrevStep?: () => void;
  goToNextUnitStep?: () => void;
  isTenantTabForm?: boolean;
  addContract?: boolean;
  setAddContract?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUnitInfo?: BuildingUnitById | null;
}
const TenantDetailsForm: FCC<Props> = ({
  onSubmitTenant,
  unitDetails,
  contractInfo,
  companyList,
  contactList,
  agents,
  tenantClassificationList,
  contractListLength,
  goToPrevStep,
  goToNextUnitStep,
  isTenantTabForm,
  addContract,
  setAddContract,
  selectedUnitInfo,
  children,
}) => {
  const useFormReturn = useForm<FieldValues>({
    defaultValues: {
      ...contractInfo,
      startDate: contractInfo?.startDate ? convertToLocalDate(contractInfo?.startDate) : undefined,
      endDate: contractInfo?.endDate ? convertToLocalFormat(contractInfo?.endDate) : undefined,
    },
    resolver: yupResolver(tenantDetailsResolver),
  });

  const { reset, setValue, getValues } = useFormReturn;

  // Get contract name by concatenating "lease floor area + unit number"
  const contractName =
    unitDetails?.leaseFloorArea !== undefined && unitDetails?.unitNumber !== null
      ? `${numberFormat(parseFloat(unitDetails?.leaseFloorArea.toString()))} SQM ${unitDetails?.unitNumber}`
      : selectedUnitInfo
      ? `${numberFormat(parseFloat(selectedUnitInfo?.leaseFloorArea.toString()))} SQM ${selectedUnitInfo?.unitNumber}`
      : '';

  useEffect(() => {
    // Reset default value in the form's and add a number format in the field specified with that format.
    if (contractInfo) {
      setValue('companyID', contractInfo?.companyID);
      reset({
        ...contractInfo,
        estimatedArea: contractInfo?.estimatedArea && numberFormat(parseFloat(contractInfo?.estimatedArea.toString())),
        closingRate: contractInfo?.closingRate && numberFormat(parseFloat(contractInfo?.closingRate.toString())),
      });
    }
  }, [contractInfo, reset, setValue]);

  const handleTenantFormNextStep = () => {
    if (contractListLength !== 0 && goToNextUnitStep) {
      goToNextUnitStep();
    }
  };

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmitTenant} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div className="p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2">
          {addContract && (
            <div className="flex justify-end mt-3 pr-2 sm:pr-4">
              <Button className="ml-auto" onClick={() => setAddContract && setAddContract(!addContract)}>
                Add Tenant
              </Button>
            </div>
          )}
          {!addContract && (
            <>
              <h3 className="font-bold">Tenant Details</h3>
              <div className="mt-4 flex flex-col md:flex-row md:divide-x space-y-4 md:space-y-0 md:space-x-4">
                <div className="md:w-1/2 space-y-4">
                  <Form.Input label="Contract Name" name="name" defaultValue={contractName} />
                  <Form.Select
                    key={getValues('companyID')}
                    label="Company"
                    name="companyID"
                    options={companyList?.map((option) => ({
                      value: option.id,
                      name: option.name,
                    }))}
                  />

                  <Form.Select
                    key={getValues('contactID')}
                    label="Contact"
                    name="contactID"
                    options={contactList?.map((option) => ({
                      value: option.id,
                      name: `${option.firstName} ${option.lastName}`,
                    }))}
                  />
                  <Form.Select
                    key={getValues('tenantClassificationID')}
                    label="Tenant Classification"
                    name="tenantClassificationID"
                    options={tenantClassificationList?.map((option) => ({
                      value: option.id,
                      name: option.name,
                    }))}
                  />
                  <Form.Datepicker key={getValues('startDate')} label="Commencement Date" name="startDate" />
                  <Form.Datepicker key={getValues('endDate')} label="Expiration Date" name="endDate" />
                </div>
                <div className="md:w-1/2 md:pl-4 space-y-4">
                  <Form.Select
                    key={getValues('brokerID')}
                    label="Agent"
                    name="brokerID"
                    options={agents?.map((option) => ({
                      value: option.id,
                      name: `${option.firstName} ${option.lastName}`,
                    }))}
                  />
                  <Form.Select
                    key={getValues('brokerCompanyID')}
                    label="Agent Company"
                    name="brokerCompanyID"
                    options={companyList?.map((option) => ({
                      value: option.id,
                      name: option.name,
                    }))}
                  />
                  <Form.NumberInput
                    label="Estimated Area"
                    name="estimatedArea"
                    trailing="SQM"
                    defaultValue={
                      selectedUnitInfo
                        ? numberFormat(parseFloat(selectedUnitInfo.leaseFloorArea.toString()))
                        : numberFormat(Number(unitDetails?.leaseFloorArea.toString()))
                    }
                  />
                  <Form.Input
                    label="Lease Term (Month)"
                    name="leaseTerm"
                    defaultValue={selectedUnitInfo ? selectedUnitInfo.minimumLeaseTerm : unitDetails?.minimumLeaseTerm}
                  />
                  <Form.NumberInput label="Closing Rate" name="closingRate" trailing="PHP" />
                  <Form.Checkbox label="Is Historical" name="isHistorical" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <div>
                  {isTenantTabForm && (
                    <Button
                      onClick={() => setAddContract && setAddContract(!addContract)}
                      btnType="secondary-gray"
                      className="ml-auto mr-2"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" className="ml-auto">
                    Save Tenant
                  </Button>
                </div>
              </div>
            </>
          )}
          {children}
        </div>
      </section>
      {!isTenantTabForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex justify-between gap-4">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            {unitDetails?.unitStatusName === UnitStatusType.vacant && (
              <Button className="ml-auto px-4" type="button" btnType="secondary-gray" onClick={goToNextUnitStep}>
                SKIP
              </Button>
            )}
            <Button
              type="button"
              suffix={<ChevronRightIcon className="h-6 w-5" />}
              onClick={handleTenantFormNextStep}
              disabled={contractListLength === 0 && true}
              className={`${contractListLength === 0 && 'group relative inline-block duration-300'}`}
            >
              NEXT STEP
              {contractListLength === 0 && (
                <span className="absolute hidden group-hover:flex -top-8 -left-0 -translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:-content-[''] before:absolute before:top-1/2  before:left-[100%] before:-translate-y-1/2 before:-border-8 before:border-y-transparent before:-border-l-transparent before:border-l-gray-700">
                  Please Add Tenant!
                </span>
              )}
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default TenantDetailsForm;
