export interface OriginalFile {
  name: string;
  type: string;
  size: number;
}
export interface File {
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

export interface FileRequest {
  documents: File[];
}
export type FileResponse = {
  id: number;
  documentName: string;
  documentSize: number;
  documentPath: string;
  documentType?: number;
  isPrimary?: boolean;
};
