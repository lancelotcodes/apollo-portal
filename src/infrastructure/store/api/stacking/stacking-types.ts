import { tagTypes } from '@/components/core/Tag/types-tag';
import { G_Pagination } from '../types/generic/params-types';

export interface Unit {
  id: number;
  floorID: number;
  name: string;
  companyName: string;
  unitNumber: string;
  unitStatusName: tagTypes;
  listingTypeName: string;
  availabilityName: string;
  leaseFloorArea: number;
  minimumLeaseTerm: number;
  tenantClassification: string;
  endDate: Date;
}

export interface FloorParam {
  Id?: number;
  Status: string;
  ExpiryYears?: string[];
  Search?: string;
}
export interface FloorsByBuildingId {
  id: number;
  buildingID: number;
  name: string;
  sort: number;
  floorPlateSize: number;
  units: Unit[];
}
export interface UnitsByBuildingId {
  id: number;
  floorID: number;
  floorName: string;
  name: string;
  companyName?: string;
  unitNumber: string;
  unitStatusID?: number;
  unitStatusName: string;
  listingTypeID?: number;
  listingTypeName: string;
  availabilityID?: number;
  availabilityName: string;
  leaseFloorArea: number;
  minimumLeaseTerm: number;
  tenantClassification?: string;
  handOverConditionID?: number;
  handOverConditionName: string;
  basePrice: number;
  cusa: number;
  escalationRate: number;
  acCharges: number;
  acExtensionCharges: number;
  endDate?: Date | string;
  isUpdated?: boolean;
}
export interface UnitsByBuildingIdDetails extends G_Pagination {
  items: UnitsByBuildingId[];
}
export interface UnitParam {
  Search?: string;
  Status?: string;
  ExpiryYears?: string[];
  PageNumber?: number;
  PageSize?: number;
}

export interface BuildingFloorUnit {
  id: number;
  name: string;
  floorID: number;
  unitNumber: string;
  unitStatusID: number;
  unitStatusName: tagTypes;
  leaseFloorArea: number;
  listingTypeID: number;
  listingTypeName: string;
  tenantName?: string;
  tenantClassification: string;
  startDate: Date | string | number;
  endDate: Date;
  contracts?: string;
  handOverConditionID: number;
  basePrice: number;
  cusa: number;
  handOverConditionName: string;
  acCharges: string;
  acExtensionCharges: string;
  escalationRate: number;
  minimumLeaseTerm: number;
  parkingRent: number;
  handOverDate: Date;
  companyName: string;
  agents?: any[];
}
export interface BuildingFloorUnits {
  id: number;
  buildingID: number;
  name: string;
  sort: number;
  floorPlateSize: number;
  units: BuildingFloorUnit[];
}

export interface Contract {
  id: number;
  name: string;
  propertyID: number;
  propertyName: string;
  companyID: number;
  companyName?: any;
  contactID: number;
  contactName?: any;
  startDate?: Date | string | number;
  endDate?: Date | string | number;
  tenantClassificationID: number;
  tenantClassificationName?: any;
  estimatedArea: number;
  leaseTerm: number;
  brokerID: number;
  brokerName?: any;
  brokerCompanyID: number;
  brokerCompanyName?: any;
  isHistorical: boolean;
}

export interface UnitAgent {
  id: number;
  agentID: number;
  agentName: string;
  agentEmail: string;
  agentPhoneNumber: string;
  profilePicture?: any;
  propertyID: number;
  agentType: number;
  isVisibleOnWeb: boolean;
  isDeleted: boolean;
}
export interface BuildingUnitById {
  id: number;
  name: string;
  floorID: number;
  unitNumber: string;
  unitStatusID: number;
  unitStatusName: tagTypes;
  leaseFloorArea: number | string;
  listingTypeID: number;
  listingTypeName: string;
  tenantName: string;
  tenantClassification?: any;
  startDate: Date;
  endDate: Date | string | number;
  handOverConditionID: number;
  basePrice: number | string;
  cusa: number | string;
  handOverConditionName: string;
  acCharges: number | string;
  acExtensionCharges: number | string;
  escalationRate: number | string;
  minimumLeaseTerm: number | string;
  parkingRent: number | string;
  handOverDate: Date;
  propertyID: number;
  availabilityID: number;
  availabilityName: string;
  unitMainImage: string;
  images: string[];
  agents?: UnitAgent[];
  contract: Contract;
  notes: string;
}
export interface StackingPlanSummary {
  expiryYear: tagTypes;
  leaseArea: number;
}

export interface FloorRequest {
  id?: 0;
  name: string;
  sort: number | string;
  buildingID: number | string;
  floorPlateSize: number;
}

export interface UnitRequest {
  id: number;
  floorID: number;
  propertyID?: number;
  unitNumber: string;
  name?: string;
  unitStatusID?: number;
  availabilityID?: number;
  leaseFloorArea?: number;
  listingTypeID?: number;
  basePrice: number;
  cusa: number | string;
  handOverConditionID?: number;
  acCharges: number;
  acExtensionCharges: number;
  escalationRate: number;
  minimumLeaseTerm: number;
  parkingRent?: number;
  handOverDate?: Date | string;
}

export interface PropertyContractsById {
  id: number;
  propertyID: number;
  name: string;
  companyID: number;
  companyName: string;
  contactID: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  startDate: Date | string;
  endDate: Date | string;
  tenantClassificationID: number;
  tenantClassificationName: string;
  estimatedArea: number;
  leaseTerm: number;
  brokerID: number;
  brokerName: string;
  brokerPhone: string;
  brokerEmail: string;
  brokerCompanyID: number;
  brokerCompanyName: string;
  isHistorical: boolean;
  closingRate: number;
}
export interface PropertyContractRequest {
  id: number;
  name: string;
  propertyID: number;
  companyID: number;
  contactID: number;
  startDate: Date;
  endDate: Date;
  tenantClassificationID: number;
  estimatedArea: number;
  leaseTerm: number;
  brokerID: number;
  brokerCompanyID: number;
  isHistorical: boolean;
  closingRate: number;
}
