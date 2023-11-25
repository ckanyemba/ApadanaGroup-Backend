import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const galleriesFetch = createAsyncThunk(
    "galleries/galleriesFetch",
    async () => {
      try {
        const response = await axios.get(`${url}/galleries`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const galleriesCreate = createAsyncThunk(
    "galleries/galleriesCreate",
    async (values) => {
      try {
        const response = await axios.post(
          `${url}/galleries`,
          values,
          setHeaders()
        );
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );

  export const galleriesEdit = createAsyncThunk(
    "galleries/galleriesEdit",
    async (values) => {
      try {
        const response = await axios.put(
          `${url}/galleries/${values.gallery._id}`,
          values,
          setHeaders()
        );
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );

  export const galleriesDelete = createAsyncThunk(
    "galleries/galleriesDelete",
    async (id) => {
      try {
        const response = await axios.delete(
          `${url}/galleries/${id}`, 
          setHeaders()
        );
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );
  

  const galleriesSlice = createSlice({
    name: "galleries",
    initialState,
    reducers: {},
    extraReducers: {
      [galleriesFetch.pending]: (state, action) => {
        state.status = "pending";
      },
      [galleriesFetch.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = "success";
      },
      [galleriesFetch.rejected]: (state, action) => {
        state.status = "rejected";
      },
      [galleriesCreate.pending]: (state, action) => {
        state.createStatus = "pending";
      },
      [galleriesCreate.fulfilled]: (state, action) => {
        state.items.push(action.payload);
        state.createStatus = "success";
        toast.success("Galleries Created");
      },
      [galleriesCreate.rejected]: (state, action) => {
        state.createStatus = "rejected";
      },
      [galleriesEdit.pending]: (state, action) => {
        state.editStatus = "pending";
      },
      [galleriesEdit.fulfilled]: (state, action) => { 
        const updatedGalleries = state.items.map((gallery) =>
        gallery._id === action.payload._id ? action.payload : gallery
        );  
        state.items = updatedGalleries;
        state.editStatus = "success";
        toast.info("Gallery Edited");
      },
      [galleriesEdit.rejected]: (state, action) => {
        state.editStatus = "rejected";
      },
      [galleriesDelete.pending]: (state, action) => {
        state.deleteStatus = "pending";
      },
      [galleriesDelete.fulfilled]: (state, action) => {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.error("Galleries Deleted"); // Fix typo here
      },      
      [galleriesDelete.rejected]: (state, action) => {
        state.deleteStatus = "rejected";
      },
    },
  });

export default galleriesSlice.reducer;