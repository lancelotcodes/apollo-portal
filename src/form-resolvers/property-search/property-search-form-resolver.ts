import * as yup from "yup";

// propertyType: string;
// listingType: string;
// propertyId: number;
// keyword?: string;
// radius: number;

export const propertySearchFormResolver = yup.object().shape({
  propertyType: yup.string().required("Property type is required"),
  listingType: yup.string().required("Listing type is required"),
  propertyId: yup.number().required("Please select a property"),
  radius: yup.number().required("Please select radius")
});
