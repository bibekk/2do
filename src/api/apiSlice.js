import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../Components/Utils/Util";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url()}`
  }),
  refetchOnFocus:true,
  tagTypes: ['task','tasks', 'tag','tags', 'tasktag'],
  endpoints: ()=>({}),
})