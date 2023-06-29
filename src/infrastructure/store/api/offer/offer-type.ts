export interface OfferOptionParam {
  PropertyTypeID?: number;
  ListingTypeID?: number;
  HandOverConditionID?: number;
  AgentID?: number;
  MinSize?: number;
  MaxSize?: number;
  ProvinceIds?: number[];
  CitiesIds?: number[];
  SubMarketsIds?: number[];
  PEZA?: number;
  OperatingHours?: boolean;
}

export interface Building {
  id: number;
  name: string;
  dateBuilt: string;
  peza: number;
  pezaName: string;
  operatingHours: boolean;
  leed: string;
  turnOverDate: Date;
  grossBuildingSize: number;
  grossLeasableSize: string;
  typicalFloorPlateSize: string;
  minimumLeaseTerm?: number;
  densityRatio: number;
  efficiencyRatio: number;
}

export interface Address {
  id: number;
  line1: string;
  cityName: string;
  subMarketName: string;
  microDistrictName: string;
  latitude: number;
  longitude: number;
}

export interface Agent {
  id: number;
  agentID: number;
  agentName: string;
  agentEmail: string;
  agentPhoneNumber: string;
  profilePicture?: string;
  propertyID: number;
  agentType: number;
  isVisibleOnWeb: boolean;
  isDeleted: boolean;
}

export interface Unit {
  id: number;
  floorID: number;
  floorName: string;
  name: string;
  unitNumber: string;
  unitStatusName: string;
  listingTypeName: string;
  availabilityName: string;
  leaseFloorArea: number;
  minimumLeaseTerm: number;
  handOverConditionName: string;
  basePrice: number;
  cusa: number;
  acCharges: string;
  acExtensionCharges: string;
  escalationRate: number;
  parkingRent: number;
  handOverDate?: Date;
}

export interface OfferOptionResponse {
  id: number;
  name: string;
  propertyTypeID: number;
  gradeID: number;
  gradeName: string;
  propertyTypeName: string;
  contactID: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  mainImage: string;
  availableUnits: number;
  availableSpace: number;
  building: Building;
  address: Address;
  agent: Agent;
  units: Unit[];
}

export interface SendOfferOnEmailRequest {
  contactID?: number;
  companyID?: number;
  subject: string;
  message: string;
  propertyTypeID?: number;
  listingTypeID?: number;
  peza?: number;
  operatingHours?: boolean;
  handOverConditionID?: number;
  minSize?: number;
  maxSize?: number;
  cityIds?: number[];
  provinceIds?: number[];
  subMarketIds?: number[];
  AgentID?: number;
  unitIds?: number[];
  templateType?: number;
  toEmail: string;
  ccEmail: string;
}
