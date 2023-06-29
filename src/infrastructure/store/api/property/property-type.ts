import { G_FilterPagination, G_Pagination } from '../types/generic/params-types';

export interface PropertyParams extends G_FilterPagination {
  Coordinates?: string;
  Query?: string;
  City?: string;
  SubMarket?: string;
  MicroDistrict?: string;
  Project?: string;
  Class?: string;
  PropertyType?: string;
  Grade?: string;
}

export interface CreatePropertyRequest {
  id: number;
  name: string;
  propertyTypeID: number | undefined;
  masterPropertyID: number | undefined;
  contactID: number | undefined;
  ownerID: number | undefined;
  gradeID: number | undefined;
  ownerCompanyID: number | undefined;
  isExclusive: boolean;
  note: string;
}
export interface PropertyResponse extends CreatePropertyRequest {
  propertyTypeName: string;
  masterPropertyName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  gradeName: string;
  ownerName: string | null;
  ownerEmail: string | null;
  ownerPhone: string | null;
  ownerCompanyName: string | null;
  mainImage: string;
  mainFloorPlanImage: string;
}

export interface PropertyDetails extends PropertyResponse {
  addressID: number;
  agents: PropertyAgentsDetails[];
  allUnits: number;
  availableSpace: number;
  availableUnits: number;
  buildingID: number;
  category: number;
  categoryName: string;
  cityID: number;
  cityName: string;
  developerID: number | null;
  developerName: string | null;
  distance: number;
  gradeID: number;
  gradeName: string;
  id: number;
  latitude: number;
  leasingContactID: number | null;
  leasingContactName: string | null;
  line1: string;
  longitude: number;
  mainImage: string;
  name: string;
  peza: number;
  pezaName: string;
  propertyTypeID: number;
  propertyTypeName: string;
  seoUrl: string;
  seoid: number;
  subMarketID: number;
  subMarketName: string;
  yearBuilt: number;
}

export interface PropertyList extends G_Pagination {
  items: PropertyDetails[];
}

export interface PropertyMap {
  id: number;
  name: string;
  mainImage?: string;
  propertyTypeID: number;
  propertyTypeName: string;
  category?: number;
  categoryName?: string;
  latitude: number;
  longitude: number;
  cityName: string;
  subMarketName: string;
}
export interface BuildingDetails {
  acSystem: string | null;
  amenities: string;
  buildingID: number;
  ceilingHeight: string;
  dateBuilt: Date | string | number | null;
  densityRatio: number;
  developerID: number | null;
  developerName: string | null;
  efficiencyRatio: number;
  elevators: string;
  grossBuildingSize: string | number;
  grossLeasableSize: string | number;
  id: number;
  leasingContactID: number | null;
  leasingContactName: number | null;
  leed: string;
  minimumLeaseTerm: number | null;
  name: string;
  operatingHours: boolean;
  ownershipTypeID: number;
  ownershipTypeName: string;
  parkingElevator: string;
  passengerElevator: string;
  peza: number;
  power: string;
  projectStatusID: number;
  propertyID: number;
  projectStatusName: string;
  propertyManagementID: number | null;
  propertyManagementName: number | null;
  serviceElevator: string;
  telcos: string;
  tenantMix: string;
  totalFloors: number;
  totalUnits: number;
  turnOverDate: Date | null;
  typicalFloorPlateSize: string | number;
  webPage: string;
  yearBuilt: number | string | undefined;
}

export interface PropertyAddress extends SavePropertyLocationRequest {
  cityName: string;
  subMarketName: string;
  microDistrictName: string;
  addressTagName: string;
}

export interface PropertyTypeDetails {
  id: number;
  name: string;
}

export interface PropertyShort {
  id: number;
  name: string;
}

export interface ContactDetails {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phoneNumber: string;
}

export interface CompanyDetails {
  id: number;
  name: string;
}
export interface GradeDetails {
  id: number;
  name: string;
}
export interface AgentDetails {
  id: number | string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phoneNumber: string;
}
export interface AgentTypeDetails {
  value: string | number;
  name: string;
}
export interface PropertyAgentsDetails {
  id: number;
  agentID: string;
  agentName: string;
  agentEmail: string;
  agentPhoneNumber?: string;
  profilePicture?: string;
  propertyID: number;
  agentType: number | string;
  isVisibleOnWeb: boolean;
  isDeleted: boolean;
}

export interface PropertySEORequest {
  id: number;
  propertyID: number | string | undefined;
  url: string;
  pageTitle: string;
  pageDescription: string;
  metaKeyword: string;
  isFeatured: boolean;
  featuredWeight: number;
}
export interface PropertySEOResponse {
  id: number;
  propertyID: number;
  url: string;
  pageTitle: string;
  pageDescription: string;
  metaKeyword: string;
  publishedDate: Date | null;
  isPublished: boolean;
  publishType: number;
  publishTypeName: string;
  isFeatured: boolean;
  featuredWeight: number;
}

export interface PropertyDocumentResponse {
  id: number;
  documentType: number;
  documentName: string;
  documentSize: number;
  documentPath: string;
}
export interface PropertyMandateResponse {
  id: number;
  name: string;
  propertyID: number;
  attachmentId: number;
  attachmentURL: string;
  attachmentName: string;
  startDate: Date;
  endDate: Date;
}
export interface PropertyVideoResponse {
  id: number;
  propertyID: number;
  documentName: string;
  thumbNailName: string;
  thumbNailPath: string;
  documentPath: string;
  thumbNailId: number;
}

export interface PropertyMandateRequest {
  id: number;
  propertyID: number;
  name: string;
  attachmentId: number | undefined | null;
  startDate: Date;
  endDate: Date;
}
export interface PropertyVideoRequest {
  id: number;
  propertyID: number;
  documentName: string;
  documentPath: string;
  thumbNailId: number | undefined;
}
export interface Image {
  id: number;
  documentID: number;
  isPrimary?: boolean;
  documentType?: number;
}

export interface PropertyImagesRequest {
  propertyID: number;
  images: Image[];
}
export interface SavePropertyBuildingRequest {
  id: number;
  propertyID: number | string;
  name: string;
  dateBuilt: Date | string;
  yearBuilt: number;
  peza: number;
  operatingHours: boolean;
  leed: string;
  turnOverDate: Date | string;
  tenantMix: string;
  grossBuildingSize: number;
  grossLeasableSize: string;
  typicalFloorPlateSize: string;
  totalFloors: number;
  totalUnits: number;
  efficiencyRatio: number;
  ceilingHeight: string;
  minimumLeaseTerm: string;
  elevators: string;
  power: string;
  acSystem: string;
  telcos: string;
  amenities: string;
  webPage: string;
  densityRatio: number;
  parkingElevator: string;
  passengerElevator: string;
  serviceElevator: string;
  leasingContactID: number;
  developerID: number;
  propertyManagementID: number;
  ownershipTypeID: number;
  projectStatusID: number;
}

export interface SavePropertyLocationRequest {
  id: number;
  propertyID: number | string;
  line1: string;
  line2: string;
  cityID: number | undefined;
  subMarketID: number | undefined;
  microDistrictID: number | undefined;
  zipCode: string;
  addressTag: number;
  latitude: number;
  longitude: number;
  polygonPoints: string;
  cityName: string;
  subMarketName: string;
  microDistrictName: string;
  addressTagName: string;
}

export interface Agent {
  agentID: number | string | undefined;
  isVisibleOnWeb: boolean;
  agentType: number;
}

export interface SavePropertyAgentRequest {
  propertyID: number | undefined;
  agents: Agent[];
}
export interface DeletePropertyAgentRequest {
  propertyID: number | string | undefined;
  agentID: number | string | undefined;
}
export interface ConfirmPropertyRequest {
  propertyID: number | undefined;
}
export interface DeletePropertyRequest {
  propertyID: number | undefined;
}

export interface OriginalFile {
  name: string;
  type: string;
  size: number;
}

export interface Document {
  filename: string;
  handle: string;
  mimetype: string;
  originalPath: string;
  size: number;
  source: string;
  url: string;
  uploadId: string;
  originalFile: OriginalFile;
  status: string;
}

export interface DocumentRequest {
  documents: Document[];
}
