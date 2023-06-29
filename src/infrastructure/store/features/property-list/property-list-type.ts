import {
  BuildingDetails,
  GradeDetails,
  PropertyAddress,
  PropertyAgentsDetails,
  PropertyDocumentResponse,
  PropertyMandateResponse,
  PropertyResponse,
  PropertySEOResponse,
  PropertyTypeDetails,
  PropertyVideoResponse,
  SavePropertyLocationRequest,
} from '@/infrastructure/store/api/property/property-type';
import { ISelectOption } from '../../api/lookup/lookup-type';
export type PropertyListViewMode = 'map' | 'grid' | 'table';

export type PropertyGroupByMode = 'City' | 'Submarket' | 'Microdistrict' | 'Project' | 'Class';

export type PropertySortByMode =
  | 'Tower name: A to Z'
  | 'Tower name: Z to A'
  | 'Last updated'
  | 'Last created'
  | 'City: A to Z'
  | 'City: Z to A';

export type ZoningClassification = 'Commercial' | 'Agricultural' | 'Industrial' | 'Residential';

export type PropertyType<T> = T extends ZoningClassification ? CommercialPropertyType : '';

export type CommercialPropertyType =
  | 'Office Complex'
  | 'Office Building'
  | 'Office Unit'
  | 'Commercial Lot'
  | 'Retail Building'
  | 'Retail Space'
  | 'Golf Course'
  | 'Hotel Complex'
  | 'Hotel Building'
  | 'Resort';

export type ResidentialPropertyType =
  | 'Condominium Complex'
  | 'Condominium Building'
  | 'Condominium Unit'
  | 'House and Lot'
  | 'Subdivision Project'
  | 'Townhouse'
  | 'Apartment'
  | 'Dormitory';

export type AgriculturalPropertyType = 'Agricultural Lot' | 'Farm' | 'Island';

export type IndustrialPropertyType = 'Warehouse' | 'Industrial Park';

export interface FilterPropertyListOptions {
  city: ISelectOption | null;
  submarket: ISelectOption | null;
  microdistrict: ISelectOption | null;
  propertyType: PropertyTypeDetails | null;
  grade: GradeDetails | null;
  location: string;
  classification: ZoningClassification[];
  // propertyType:
  //   | CommercialPropertyType
  //   | ResidentialPropertyType
  //   | AgriculturalPropertyType
  //   | IndustrialPropertyType
  //   | null;
  published: 'Show All' | 'Published' | 'Not Published';
}
export interface FilterPayloadPropertyListOptions {
  city: number | null | undefined;
  submarket: number | null | undefined;
  microdistrict: number | null | undefined;
  propertyType: number | null | undefined;
  grade: number | null | undefined;
  location: string;
  classification: ZoningClassification[];
  published: 'Show All' | 'Published' | 'Not Published';
}

export type PropertyListState = {
  viewMode: PropertyListViewMode;
  createNewItemDialogOpen: boolean;
  createNewClientTypeToggle: {
    createNewClientDialogOpen: boolean;
    newClientTypeName: string;
  };
  selectedPropertyInfo: PropertyResponse | null;
  selectedPropertyAgents: PropertyAgentsDetails[] | null;
  selectedProperty: BuildingDetails | null;
  selectedPropertyAddress: PropertyAddress | SavePropertyLocationRequest | null;
  selectedPropertySEO: PropertySEOResponse | null;
  selectedPropertyVideo: PropertyVideoResponse | null;
  selectedPropertyDocuments: PropertyDocumentResponse[] | null;
  selectedPropertyMandate: PropertyMandateResponse[] | null;
  selectedPropertyDetailsLoading: boolean | null;
  paginationIndex: number;
  sortBy: { [key in PropertySortByMode as string]: boolean };
  groupBy: {
    City: boolean;
    Submarket: boolean;
    Microdistrict: boolean;
    Project: boolean;
    Class: boolean;
  };
  search: string;
  filter: FilterPropertyListOptions;
};

export type RemoveFilterPayload = {
  action: 'location' | 'classification' | 'propertyType' | 'published';
  data?: Partial<Omit<FilterPropertyListOptions, 'classification'>> & {
    classification: ZoningClassification;
  };
};
