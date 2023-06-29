import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileResponse, FileSlice } from './files-type';

const initialState: FileSlice = {
  filesList: [
    {
      id: 15,
      documentName: 'KMC-Portal.png',
      documentSize: 507048,
      documentPath: 'https://cdn.filestackcontent.com/JB3At8YoTBGSjqWVyDnO',
    },
  ],
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileResponse: (state, action: PayloadAction<FileResponse[]>) => {
      if (action.payload === null) {
        state.filesList = action.payload;
        return;
      }
      state.filesList = [...(<[]>state.filesList), ...(<[]>action.payload)];

      console.log((state.filesList = action.payload));
    },
  },
});

export const { setFileResponse } = fileSlice.actions;
export default fileSlice.reducer;
