// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import { base_url } from '../Components/Utils/Util'

// export const taskAPISlice = createApi({
//   reducerPath: 'tasks',
//   baseQuery: fetchBaseQuery({
//     baseUrl:  `${base_url()}`
//   }),
//   endpoints: (builder)=> {
//     return {
//       getTasks: builder.query({
//         query: ()=> `/task/gettasks`
//       }),
//     }
//   }
// })

// export const { useGetTasksQuery} = taskAPISlice