import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://172.23.4.80/data" }),
  tagTypes: ["Data"],
  endpoints: (builder) => ({}),
});
