export interface ContactResponse {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phoneNumber: string;
}
export interface ContactRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyID: number;
}
