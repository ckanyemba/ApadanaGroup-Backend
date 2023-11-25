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

export const articlesFetch = createAsyncThunk(
    "articles/articlesFetch",
    async () => {
      try {
        const response = await axios.get(`${url}/articles`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const articlesCreate = createAsyncThunk(
    "articles/articlesCreate",
    async (values) => {
      try {
        const response = await axios.post(
          `${url}/articles`,
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

  export const articlesEdit = createAsyncThunk(
    "articles/articlesEdit",
    async (values) => {
      try {
        const response = await axios.put(
          `${url}/articles/${values.article._id}`,
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

  export const articlesDelete = createAsyncThunk(
    "articles/articlesDelete",
    async (id) => {
      try {
        const response = await axios.delete(
          `${url}/articles/${id}`, 
          setHeaders()
        );
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );
  

  const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: {
      [articlesFetch.pending]: (state, action) => {
        state.status = "pending";
      },
      [articlesFetch.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = "success";
      },
      [articlesFetch.rejected]: (state, action) => {
        state.status = "rejected";
      },
      [articlesCreate.pending]: (state, action) => {
        state.createStatus = "pending";
      },
      [articlesCreate.fulfilled]: (state, action) => {
        state.items.push(action.payload);
        state.createStatus = "success";
        toast.success("Articles Created");
      },
      [articlesCreate.rejected]: (state, action) => {
        state.createStatus = "rejected";
      },
      [articlesEdit.pending]: (state, action) => {
        state.editStatus = "pending";
      },
      [articlesEdit.fulfilled]: (state, action) => { 
        const updatedArticles = state.items.map((article) =>
        article._id === action.payload._id ? action.payload : article
        );  
        state.items = updatedArticles;
        state.editStatus = "success";
        toast.info("Articles Edited");
      },
      [articlesEdit.rejected]: (state, action) => {
        state.editStatus = "rejected";
      },
      [articlesDelete.pending]: (state, action) => {
        state.deleteStatus = "pending";
      },
      [articlesDelete.fulfilled]: (state, action) => {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.error("Articles Deleted"); // Fix typo here
      },      
      [articlesDelete.rejected]: (state, action) => {
        state.deleteStatus = "rejected";
      },
    },
  });

export default articlesSlice.reducer;