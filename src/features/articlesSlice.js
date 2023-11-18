import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await fetch('http://localhost:5000/api/articles');
  const data = await response.json();
  return data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: { articles: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;


