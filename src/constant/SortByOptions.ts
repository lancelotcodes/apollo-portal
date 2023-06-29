import { StackingSortBy } from '@/infrastructure/store/features/property-details/property-details.slice';
import { PropertySortByMode } from '@/infrastructure/store/features/property-list/property-list-type';

export const sortByOptions: { key: PropertySortByMode; title: string }[] = [
  {
    key: 'Tower name: A to Z',
    title: 'Tower name: A to Z',
  },
  {
    key: 'Tower name: Z to A',
    title: 'Tower name: Z to A',
  },
  {
    key: 'Last updated',
    title: 'Last updated',
  },
  {
    key: 'Last created',
    title: 'Last created',
  },
  {
    key: 'City: A to Z',
    title: 'City: A to Z',
  },
  {
    key: 'City: Z to A',
    title: 'City: Z to A',
  },
];

export const stackingSortOptions = (buildingTotalFloors: number): { key: StackingSortBy; title: string }[] => {
  return [
    {
      key: 'desc',
      title: `Building floor: ${buildingTotalFloors !== -Infinity ? buildingTotalFloors : 0} to 1`,
    },
    {
      key: 'asc',
      title: `Building floor: 1 to ${buildingTotalFloors !== -Infinity ? buildingTotalFloors : 0}`,
    },
  ];
};
