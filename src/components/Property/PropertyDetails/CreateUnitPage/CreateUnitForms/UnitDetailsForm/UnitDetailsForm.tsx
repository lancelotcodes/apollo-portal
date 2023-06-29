import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { unitDetailsResolver } from '@/form-resolvers/create-unit/unit-details-resolver';
import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { numberFormat } from '@/helpers/numberFormat';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { BuildingUnitById, FloorsByBuildingId, UnitRequest } from '@/infrastructure/store/api/stacking/stacking-types';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
interface Props {
  onSubmitUnitDetails: SubmitHandler<UnitRequest>;
  status?: ISelectOption[];
  availability?: ISelectOption[];
  listingType?: ISelectOption[];
  handOverCondition?: ISelectOption[];
  buildingFloors?: FloorsByBuildingId[];
  buildingUnitDetails?: BuildingUnitById;
  IsUnitTabForm?: boolean;
  cardBorderClass?: string;
  cardRowClass?: string;
  cardColOneClass?: string;
  cardColTwoClass?: string;
}

const UnitDetailsForm: FCC<Props> = ({
  onSubmitUnitDetails,
  status,
  availability,
  listingType,
  handOverCondition,
  buildingFloors,
  buildingUnitDetails,
  IsUnitTabForm,
  cardBorderClass,
  cardRowClass,
  cardColOneClass,
  cardColTwoClass,
}) => {
  const useFormReturn = useForm<BuildingUnitById>({
    resolver: yupResolver(unitDetailsResolver),
    defaultValues: buildingUnitDetails,
  });

  const { reset, setValue, getValues } = useFormReturn;

  useEffect(() => {
    if (buildingUnitDetails) {
      setValue('floorID', buildingUnitDetails?.floorID);

      // Reset default value in the form's and add a number format in the field specified with that format.
      reset({
        ...buildingUnitDetails,
        leaseFloorArea:
          buildingUnitDetails?.leaseFloorArea &&
          numberFormat(parseFloat(buildingUnitDetails?.leaseFloorArea.toString())),
        parkingRent:
          buildingUnitDetails?.parkingRent && numberFormat(parseFloat(buildingUnitDetails?.parkingRent.toString())),
        basePrice:
          buildingUnitDetails?.basePrice && numberFormat(parseFloat(buildingUnitDetails?.basePrice.toString())),
        cusa: buildingUnitDetails?.cusa && numberFormat(parseFloat(buildingUnitDetails?.cusa.toString())),
        minimumLeaseTerm:
          buildingUnitDetails?.minimumLeaseTerm &&
          numberFormat(parseFloat(buildingUnitDetails?.minimumLeaseTerm.toString())),
        escalationRate:
          buildingUnitDetails?.escalationRate &&
          numberFormat(parseFloat(buildingUnitDetails?.escalationRate.toString())),
      });
    }
  }, [buildingUnitDetails, reset, setValue]);

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmitUnitDetails} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div className={classNames('p-4 rounded-lg', cardBorderClass)}>
          {!IsUnitTabForm && <h3 className="font-bold">Unit Details</h3>}

          <div className={classNames('mt-4 flex flex-col space-y-4', cardRowClass)}>
            <div className={classNames('space-y-4', cardColOneClass)}>
              <Form.Input label="Name" name="name" />
              <Form.Select
                key={getValues('floorID')}
                label="Floor"
                name="floorID"
                options={buildingFloors?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Status"
                name="unitStatusID"
                options={status?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Availability"
                name="availabilityID"
                options={availability?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Select
                label="Listing Type"
                name="listingTypeID"
                options={listingType?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Input label="Unit Number" name="unitNumber" />
              <Form.NumberInput label="Floor Area" name="leaseFloorArea" trailing="SQM" />
              <Form.NumberInput label="Base Price" name="basePrice" trailing="PHP" />
              <Form.NumberInput label="CUSA" name="cusa" trailing="PHP" />
            </div>

            <div className={classNames('space-y-4', cardColTwoClass)}>
              <Form.Input label="AC Charges" name="acCharges" />
              <Form.Input label="AC Extension Charges" name="acExtensionCharges" />
              <Form.NumberInput label="Parking Rent" name="parkingRent" trailing="PHP" />
              <Form.NumberInput label="Escalation Rate (%)" name="escalationRate" />
              <Form.NumberInput label="Minimum Lease Term (Month)" name="minimumLeaseTerm" />
              <Form.Select
                label="Hand Over Condition"
                name="handOverConditionID"
                options={handOverCondition?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
              <Form.Datepicker label="Hand Over Date" name="handOverDate" />
              <Form.TextArea label="Notes" name="notes" />
            </div>
          </div>
          {IsUnitTabForm && (
            <div className="flex justify-end mt-4">
              <Button type="submit" className="ml-auto">
                Save Unit
              </Button>
            </div>
          )}
        </div>
      </section>
      {!IsUnitTabForm && (
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

export default UnitDetailsForm;
