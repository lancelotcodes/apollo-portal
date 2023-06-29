import API from '@/helpers/axios-instance/axiosInstance';

export const ImportFile = async (url: string, data: FormData) => {
  try {
    const res = await API.post(url, data, { responseType: 'json' });
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};
export const ExportFile = async (url: string) => {
  try {
    const res = await API.get(url, { responseType: 'blob' });
    if (res) {
      const headerLine = res.headers['content-disposition'];
      const startFileNameIndex = headerLine.indexOf('"') + 1;
      const endFileNameIndex = headerLine.lastIndexOf('"');
      const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
    return res;
  } catch (error) {
    return error;
  }
};
