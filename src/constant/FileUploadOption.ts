export class MaxFileUpload {
  static minFile = 1;
  static maxFile = 5;
}
export function CheckFileType(file: string) {
  if (file !== null) {
    console.log('file', file);
    // get file extension
    const extension = file.substring(file.lastIndexOf('.') + 1, file.length);
    return extension;
  }
}
