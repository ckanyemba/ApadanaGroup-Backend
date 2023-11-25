import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleriesApi = createApi({
    reducerPath: "galleriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000"}),
    endpoints: (builder) => ({
        getAllGalleries: builder.query({
            query: () => "galleries",
        }),
    }),

});

export const { useGetAllGalleriesQuery } = galleriesApi;