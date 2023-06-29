import { useBuildingFloorUnitByIdQuery } from '@/infrastructure/store/api/stacking/stacking-api';
import {
  setSelectedUnitDetails,
  setSelectedUnitDetailsLoading,
} from '@/infrastructure/store/features/unit-list/unit-list-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';

export const useSelectedPropertyUnit = (id?: number | string | null) => {
  const dispatch = useAppDispatch();

  const { data: unitDetails, isLoading: isUnitDetailsLoading } = useBuildingFloorUnitByIdQuery(id ?? skipToken);
  useEffect(() => {
    if (unitDetails) {
      dispatch(setSelectedUnitDetails(unitDetails?.data));
    }
  }, [dispatch, unitDetails]);
  useEffect(() => {
    dispatch(setSelectedUnitDetailsLoading(isUnitDetailsLoading));
  }, [dispatch, isUnitDetailsLoading]);
};
