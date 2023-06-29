import { OfficeBuildingIcon, OfficeComplexIcon } from '@/components/core/Icon';
import { OptionDefaultFormat } from '@/components/core/NewSelect';

export const propertyTypeOptions: OptionDefaultFormat[] = [
  {
    value: 'Office Complex',
    name: 'Office Complex',
  },
  {
    value: 'Office Building',
    name: 'Office Building',
  },
  {
    value: 'Office Unit',
    name: 'Office Unit',
  },
  {
    value: 'Commercial Lot',
    name: 'Commercial Lot',
  },
  {
    value: 'Retail Building',
    name: 'Retail Building',
  },
  {
    value: 'Retail Space',
    name: 'Retail Space',
  },
  {
    value: 'Gold Course',
    name: 'Gold Course',
  },
  {
    value: 'Hotel Building',
    name: 'Hotel Building',
  },
  {
    value: 'Hotel Comples',
    name: 'Hotel Comples',
  },
  {
    value: 'Resort',
    name: 'Resort',
  },
  {
    value: 'Warehouse',
    name: 'Warehouse',
  },
  {
    value: 'Industrial Park',
    name: 'Industrial Park',
  },
  {
    value: 'Condominium Complex',
    name: 'Condominium Complex',
  },
  {
    value: 'Condominium Building',
    name: 'Condominium Building',
  },
  {
    value: 'Condominium Unit',
    name: 'Condominium Unit',
  },
  {
    value: 'Subdivision Project',
    name: 'Subdivision Project',
  },
  {
    value: 'House and Lot',
    name: 'House and Lot',
  },
  {
    value: 'Townhouse',
    name: 'Townhouse',
  },
  {
    value: 'Apartment',
    name: 'Apartment',
  },
  {
    value: 'Dormitory',
    name: 'Dormitory',
  },
  {
    value: 'Agricultural Lot',
    name: 'Agricultural Lot',
  },
  {
    value: 'Fasrm',
    name: 'Fasrm',
  },
  {
    value: 'Island',
    name: 'Island',
  },
];

export const propertyTypeIcons: Record<string, () => JSX.Element> = {
  'Office Complex': OfficeComplexIcon,
  6: OfficeBuildingIcon,
  'Office Unit': OfficeBuildingIcon,
  'Commercial Lot': OfficeBuildingIcon,
  'Retail Building': OfficeBuildingIcon,
  'Retail Space': OfficeBuildingIcon,
  'Gold Course': OfficeBuildingIcon,
  'Hotel Building': OfficeBuildingIcon,
  'Hotel Comples': OfficeBuildingIcon,
  Resort: OfficeBuildingIcon,
  Warehouse: OfficeBuildingIcon,
  'Industrial Park': OfficeBuildingIcon,
  'Condominium Complex': OfficeBuildingIcon,
  'Condominium Building': OfficeBuildingIcon,
  'Subdivision Project': OfficeBuildingIcon,
  'House and Lot': OfficeBuildingIcon,
  Townhouse: OfficeBuildingIcon,
  Apartment: OfficeBuildingIcon,
  Dormitory: OfficeBuildingIcon,
  'Agricultural Lot': OfficeBuildingIcon,
  1: OfficeBuildingIcon,
  Island: OfficeBuildingIcon,
};
