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

export const eventsFetch = createAsyncThunk(
    "events/eventsFetch",
    async () => {
      try {
        const response = await axios.get(`${url}/events`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const eventsCreate = createAsyncThunk(
    "events/eventsCreate",
    async (values) => {
      try {
        const response = await axios.post(
          `${url}/events`,
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
  

  export const eventsEdit = createAsyncThunk(
    "events/eventsEdit",
    async (values) => {
      try {
        const response = await axios.put(
          `${url}/events/${values.event._id}`,
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

  export const eventsDelete = createAsyncThunk(
    "events/eventsDelete",
    async (id) => {
      try {
        const response = await axios.delete(
          `${url}/events/${id}`, 
          setHeaders()
        );
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );
  

  const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: {
      [eventsFetch.pending]: (state, action) => {
        state.status = "pending";
      },
      [eventsFetch.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = "success";
      },
      [eventsFetch.rejected]: (state, action) => {
        state.status = "rejected";
      },
      [eventsCreate.pending]: (state, action) => {
        state.createStatus = "pending";
      },
      [eventsCreate.fulfilled]: (state, action) => {
        state.items.push(action.payload);
        state.createStatus = "success";
        toast.success("Event Created");
      },
      [eventsCreate.rejected]: (state, action) => {
        state.createStatus = "rejected";
      },
      [eventsEdit.pending]: (state, action) => {
        state.editStatus = "pending";
      },
      [eventsEdit.fulfilled]: (state, action) => { 
        const updatedEvents = state.items.map((event) =>
        event._id === action.payload._id ? action.payload : event
        );  
        state.items = updatedEvents;
        state.editStatus = "success";
        toast.info("Event Edited");
      },
      [eventsEdit.rejected]: (state, action) => {
        state.editStatus = "rejected";
      },
      [eventsDelete.pending]: (state, action) => {
        state.deleteStatus = "pending";
      },
      [eventsDelete.fulfilled]: (state, action) => {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.error("Event Deleted"); // Fix typo here
      },      
      [eventsDelete.rejected]: (state, action) => {
        state.deleteStatus = "rejected";
      },
    },
  });

export default eventsSlice.reducer;