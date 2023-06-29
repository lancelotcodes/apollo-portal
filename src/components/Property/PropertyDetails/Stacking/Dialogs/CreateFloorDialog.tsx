import React from 'react';
import Button from '@/components/core/Button';
import Dialog from '@/components/core/Dialog';
import { toggleCreateFloorDialog } from '@/infrastructure/store/features/property-details/property-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import Form from '@/components/core/Form';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveFloorResolver } from '@/form-resolvers/create-floor/create-floor-resolver';
import { useSaveFloorMutation } from '@/infrastructure/store/api/stacking/stacking-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import { FloorRequest } from '@/infrastructure/store/api/stacking/stacking-types';
import { numberFormat } from '@/helpers/numberFormat';

const CreateFloorForm = () => {
  const useFormReturn = useForm<FieldValues>({
    resolver: yupResolver(saveFloorResolver),
  });

  const { reset, setValue } = useFormReturn;

  const { createFloorDialogOpen } = useAppSelector((app) => app['property-details'].stacking);
  const { selectedBuildingFloorDetails } = useAppSelector((app) => app['unit-list']);

  const dispatch = useAppDispatch();
  const { selectedProperty } = useAppSelector((app) => app['property-list']);

  // Set default value in the sort field
  const sortIncrement =
    selectedBuildingFloorDetails.length !== 0 &&
    Math.max(
      ...selectedBuildingFloorDetails.map(function (o) {
        return o.sort;
      }),
    ) + 1;

  setValue('sort', sortIncrement ? numberFormat(parseFloat(sortIncrement.toString())) : 1);

  // Set property floor size in floor size field
  setValue(
    'floorPlateSize',
    selectedProperty?.typicalFloorPlateSize &&
      numberFormat(parseFloat(selectedProperty?.typicalFloorPlateSize.toString())),
  );

  const [saveFloor] = useSaveFloorMutation();

  const handleOnSubmit: SubmitHandler<FloorRequest> = async (e) => {
    if (selectedProperty?.id) {
      const res = await saveFloor({ ...e, buildingID: selectedProperty?.id }).unwrap();
      res?.message && HandleNotification(res?.message, res?.success);
      res?.message && handleCloseDialog();
      reset({
        name: '',
        sort: '',
        floorPlateSize: '',
      });
    }
  };

  const handleCloseDialog = () => {
    dispatch(toggleCreateFloorDialog(false));
  };
  return (
    <Dialog size="xl" title="Create Floor" modalState={createFloorDialogOpen} closeDialog={handleCloseDialog}>
      <Form useFormReturn={useFormReturn} onSubmit={handleOnSubmit} className="space-y-4">
        <Form.Input label="Name" name="name" inputClassName="py-1" />
        <Form.NumberInput label="Sort" name="sort" min={1} inputClassName="py-1" />
        <Form.NumberInput label="Floor Plate Size" name="floorPlateSize" inputClassName="py-1" trailing="SQM" />
        <div className="flex justify-end mt-4">
          <Button type="submit" className="ml-auto">
            Save Floor
          </Button>
        </div>
      </Form>
    </Dialog>
  );
};
export default CreateFloorForm;
