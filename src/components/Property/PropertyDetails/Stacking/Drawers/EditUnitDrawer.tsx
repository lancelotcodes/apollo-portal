import AlertBox from '@/components/core/Alert';
import Button from '@/components/core/Button';
import Drawer from '@/components/core/Drawer';
import Form from '@/components/core/Form';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { UnitStatusID } from '@/constant/UnitStatusType';
import { multiUnitDetailsResolver } from '@/form-resolvers/create-unit/multiunit-details-resolver';
import { useDialogState } from '@/hooks/useDialogState';
import {
  useUnitAvailabilityQuery,
  useUnitHandOverConditionQuery,
  useUnitListingTypeQuery,
  useUnitStatusQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import {
  useFloorsByBuildingIdQuery,
  useLazyUnitsByBuildingIdQuery,
  useSaveUnitsMutation,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { UnitRequest, UnitsByBuildingId } from '@/infrastructure/store/api/stacking/stacking-types';
import { toggleEditUnitDrawer } from '@/infrastructure/store/features/property-details/property-details.slice';
import { setSelectedBuildingUnitsDetails } from '@/infrastructure/store/features/unit-list/unit-list-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditUnitDrawer = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const [isStatusChangeAlert, setIsStatusChangeAlert] = useState<boolean>(false);
  const [multiUnitPayload, setMultiUnitPayload] = useState<UnitRequest>();
  const { selectedProperty } = useAppSelector((app) => app['property-list']);
  const { editUnitDrawerOpen, selectedUnitsFlatRows } = useAppSelector((app) => app['property-details'].stacking);
  const dispatch = useAppDispatch();

  const { data: unitStatus } = useUnitStatusQuery(null);
  const { data: unitListingType } = useUnitListingTypeQuery(null);
  const { data: unitAvailability } = useUnitAvailabilityQuery(null);
  const { data: unitHandOverCondition } = useUnitHandOverConditionQuery(null);
  const { data: buildingFloors } = useFloorsByBuildingIdQuery({ Id: selectedProperty?.id } ?? skipToken);
  const [getUnits, { data: buildingUnits }] = useLazyUnitsByBuildingIdQuery();
  if (buildingUnits) {
    dispatch(setSelectedBuildingUnitsDetails(buildingUnits?.data?.items));
  }
  const [saveUnits, { isLoading: isSaveUnitLoading }] = useSaveUnitsMutation();
  const useFormReturn = useForm({ resolver: yupResolver(multiUnitDetailsResolver) });
  const { reset, watch } = useFormReturn;

  const isEmptyForm = Object.values(watch()).every((x) => x === null || x === '');
  const onSubmit = async (e: UnitRequest) => {
    const compareWithArray = (row: UnitsByBuildingId[]) => {
      let result = false;

      for (let i = 0; i < row.length; i++) {
        if (row[i].unitStatusID !== e.unitStatusID) {
          return (result = e.unitStatusID === UnitStatusID.vacant ? true : false);
        }
      }
      return result;
    };

    // Check Status IsTenantedToVacant => to show alert
    const isTenantedToVacant: boolean = compareWithArray(selectedUnitsFlatRows);

    if (isTenantedToVacant === true) {
      setIsStatusChangeAlert(true);
      setMultiUnitPayload(e);
    } else {
      const payload = selectedUnitsFlatRows.map((row: UnitsByBuildingId) => {
        return {
          id: row.id,
          floorID: row.floorID,
          unitNumber: row.unitNumber,
          unitStatusID: e.unitStatusID ? e.unitStatusID : row.unitStatusID,
          availabilityID: e.availabilityID ? e.availabilityID : row.availabilityID,
          handOverConditionID: e.handOverConditionID ? e.handOverConditionID : row.handOverConditionID,
          listingTypeID: e.listingTypeID ? e.listingTypeID : row.listingTypeID,
          leaseFloorArea: e.leaseFloorArea ? e.leaseFloorArea : row.leaseFloorArea,
          basePrice: e.basePrice ? e.basePrice : row.basePrice,
          acCharges: e.acCharges ? e.acCharges : row.acCharges,
          cusa: e.cusa ? e.cusa : row.cusa,
          acExtensionCharges: e.acExtensionCharges ? e.acExtensionCharges : row.acExtensionCharges,
          escalationRate: e.escalationRate ? e.escalationRate : row.escalationRate,
          minimumLeaseTerm: e.minimumLeaseTerm ? e.minimumLeaseTerm : row.minimumLeaseTerm,
        };
      });
      const res = await saveUnits({ units: payload }).unwrap();
      res && HandleNotification(res.message, res.success);
      res.success && getUnits({ Id: selectedProperty?.id } ?? skipToken).unwrap();
      buildingUnits && dispatch(setSelectedBuildingUnitsDetails(buildingUnits?.data?.items));
      reset({
        floorID: '',
        unitStatusID: '',
        availabilityID: '',
        handOverConditionID: '',
        listingTypeID: '',
        basePrice: '',
        leaseFloorArea: '',
        acCharges: '',
        cusa: '',
        acExtensionCharges: '',
        escalationRate: '',
        minimumLeaseTerm: '',
      });
      dispatch(toggleEditUnitDrawer(false));
    }
  };
  const onCancelEditUnitForm = () => {
    dispatch(toggleEditUnitDrawer(false));
    reset({
      floorID: '',
      unitStatusID: '',
      availabilityID: '',
      handOverConditionID: '',
      listingTypeID: '',
      basePrice: '',
      leaseFloorArea: '',
      acCharges: '',
      cusa: '',
      acExtensionCharges: '',
      escalationRate: '',
      minimumLeaseTerm: '',
    });
  };
  const handleMultiUnitSubmit = async () => {
    const payload = selectedUnitsFlatRows.map((row: UnitsByBuildingId) => {
      return {
        id: row.id,
        floorID: row.floorID,
        unitNumber: row.unitNumber,
        unitStatusID: multiUnitPayload?.unitStatusID ? multiUnitPayload?.unitStatusID : row.unitStatusID,
        availabilityID: multiUnitPayload?.availabilityID ? multiUnitPayload?.availabilityID : row.availabilityID,
        handOverConditionID: multiUnitPayload?.handOverConditionID
          ? multiUnitPayload?.handOverConditionID
          : row.handOverConditionID,
        listingTypeID: multiUnitPayload?.listingTypeID ? multiUnitPayload?.listingTypeID : row.listingTypeID,
        leaseFloorArea: multiUnitPayload?.leaseFloorArea ? multiUnitPayload?.leaseFloorArea : row.leaseFloorArea,
        basePrice: multiUnitPayload?.basePrice ? multiUnitPayload?.basePrice : row.basePrice,
        acCharges: multiUnitPayload?.acCharges ? multiUnitPayload?.acCharges : row.acCharges,
        cusa: multiUnitPayload?.cusa ? multiUnitPayload?.cusa : row.cusa,
        acExtensionCharges: multiUnitPayload?.acExtensionCharges
          ? multiUnitPayload?.acExtensionCharges
          : row.acExtensionCharges,
        escalationRate: multiUnitPayload?.escalationRate ? multiUnitPayload?.escalationRate : row.escalationRate,
        minimumLeaseTerm: multiUnitPayload?.minimumLeaseTerm
          ? multiUnitPayload?.minimumLeaseTerm
          : row.minimumLeaseTerm,
      };
    });
    setIsStatusChangeAlert(false);
    const res = await saveUnits({ units: payload }).unwrap();
    res && HandleNotification(res.message, res.success);
    res.success && getUnits({ Id: selectedProperty?.id } ?? skipToken).unwrap();
    buildingUnits && dispatch(setSelectedBuildingUnitsDetails(buildingUnits?.data?.items));
    reset({
      floorID: '',
      unitStatusID: '',
      availabilityID: '',
      handOverConditionID: '',
      listingTypeID: '',
      basePrice: '',
      leaseFloorArea: '',
      acCharges: '',
      cusa: '',
      acExtensionCharges: '',
      escalationRate: '',
      minimumLeaseTerm: '',
    });
    dispatch(toggleEditUnitDrawer(false));
  };

  const handleCloseEditUnitDrawer = () => {
    dispatch(toggleEditUnitDrawer(false));
  };
  const handleOpenAlertModal = () => {
    setOpenDialog();
  };
  const handleConfirmDialog = () => {
    setCloseDialog();
    dispatch(toggleEditUnitDrawer(false));
  };

  return (
    <Drawer
      title="Multiselect Edit"
      isOpen={editUnitDrawerOpen}
      closeDrawer={isEmptyForm === true ? handleCloseEditUnitDrawer : handleOpenAlertModal}
    >
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <div className="space-y-4">
          {/* <Form.Input disabled name="unitNumber" label="Unit Number" defaultValue="Mixed" /> */}
          <Form.Select
            label="Listing Type"
            name="listingTypeID"
            options={unitListingType?.data?.map((option) => ({
              value: option.id,
              name: option.name,
            }))}
          />
          <Form.Select
            label="Availability"
            name="availabilityID"
            options={unitAvailability?.data?.map((option) => ({
              value: option.id,
              name: option.name,
            }))}
          />
          <Form.Select
            label="Hand Over Condition"
            name="handOverConditionID"
            options={unitHandOverCondition?.data?.map((option) => ({
              value: option.id,
              name: option.name,
            }))}
          />
          <Form.Select
            label="Status"
            name="unitStatusID"
            options={unitStatus?.data?.map((option) => ({
              value: option.id,
              name: option.name,
            }))}
          />
          <Form.Select
            label="Floor Location"
            name="floorID"
            options={buildingFloors?.data?.map((option) => ({
              value: option.id,
              name: option.name,
            }))}
          />
          <Form.NumberInput label="Floor Area" name="leaseFloorArea" trailing="SQM" />
          <Form.NumberInput label="Base Price" name="basePrice" trailing="PHP" />
          <Form.NumberInput label="CUSA" name="cusa" trailing="PHP" />
          <Form.Input label="AC Charges" name="acCharges" />
          <Form.Input label="AC Extension Charges" name="acExtensionCharges" />
          <Form.NumberInput label="Escalation Rate (%)" name="escalationRate" />
          <Form.NumberInput label="Minimum Lease Term (Month)" name="minimumLeaseTerm" />
        </div>
        <div className="flex gap-4 justify-end mt-10">
          <Button onClick={onCancelEditUnitForm} type="button" className="w-1/2 sm:w-auto" btnType="tertiary-gray">
            CANCEL
          </Button>
          <Button type="submit" className="w-1/2 sm:w-auto">
            SUBMIT
          </Button>
          {isSaveUnitLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center z-10">
              <Loader />
            </div>
          )}
        </div>
      </Form>
      <AlertBox
        dialogTitle={'Edit Units'}
        isDialogOpen={isOpen}
        handleConfirmDialog={handleConfirmDialog}
        handleCloseDialog={setCloseDialog}
      >
        {'Are you sure you want to leave, you will lose your data if you continue!'}
      </AlertBox>
      <AlertBox
        dialogTitle={'Status Update'}
        isDialogOpen={isStatusChangeAlert}
        handleCloseDialog={() => setIsStatusChangeAlert(false)}
        handleConfirmDialog={() => handleMultiUnitSubmit()}
      >
        {'Changing the status to vacant will result in updating the Tenant record into historical data'}
      </AlertBox>
    </Drawer>
  );
};

export default EditUnitDrawer;
