import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/"}),
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            query: () => `events`,
        }),
    }),

});

export const { useGetAllEventsQuery } = eventsApi;