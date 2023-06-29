import { ZoningClassification } from "@/infrastructure/store/features/property-list/property-list-type";
import { tagTypes } from "@/components/core/Tag/types-tag";
import { OptionDefaultFormat } from "@/components/core/NewSelect";

// "Commercial" | "Agricultural" | "Industrial" | "Residential"
export const zoningClassificationOptions: OptionDefaultFormat[] = [
  {
    value: "Commercial",
    name: "Commercial"
  },
  {
    value: "Residential",
    name: "Residential"
  },
  {
    value: "Industrial",
    name: "Industrial"
  },
  {
    value: "Agricultural",
    name: "Agricultural"
  }
];

export const classTypeToTagType: Record<ZoningClassification, tagTypes> = {
  Agricultural: "zoning-agricultural",
  Commercial: "zoning-commercial",
  Industrial: "zoning-industrial",
  Residential: "zoning-residential"
};
