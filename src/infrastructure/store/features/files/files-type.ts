export type FileResponse = {
  id: number;
  documentName: string;
  documentSize: number;
  documentPath: string;
  documentType?: number;
};
export type FileSlice = {
  filesList: FileResponse[];
};
