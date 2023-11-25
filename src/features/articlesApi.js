import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000"}),
    endpoints: (builder) => ({
        getAllArticles: builder.query({
            query: () => "articles",
        }),
    }),

});

export const { useGetAllArticlesQuery } = articlesApi;