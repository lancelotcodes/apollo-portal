import { BuildingUnitById, FloorsByBuildingId, UnitsByBuildingId } from '../../api/stacking/stacking-types';

export type StackingListState = {
  selectedUnitDetails: BuildingUnitById | null;
  selectedBuildingFloorDetails: FloorsByBuildingId[];
  selectedBuildingUnitsDetails: UnitsByBuildingId[];
  selectedUnitTableData: UnitsByBuildingId[];
  selectedUnitDetailsLoading: boolean | null;
};
