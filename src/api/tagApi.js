import { apiSlice } from "./apiSlice"

export const tagApi = apiSlice.injectEndpoints({
  endpoints: (builder) =>({
    getTags: builder.query({
      query: ()=> `/tag/gettags`,
      providesTags:['tags'],
    }),
    deleteTag: builder.mutation({
      query: (tag_id)=>({
        url: `tag/deletetag?tag_id=${tag_id}`,
        method: 'DELETE',
      }),
      invalidatesTags:['tags']
    }),
    addTag:builder.mutation({
      query: (newtag) => ({
        url: `/tag/addtag`,
        method: 'POST',
        body: newtag,
      }),
      invalidatesTags:['tags'],
    }),
    updateTag: builder.mutation({
      query: (tag) => ({
        url: `/tag/updatetag?tag_id=${tag.tag_id}`,
        method: 'PUT',
        body: tag
      }),
      invalidatesTags: ['tags','tasktag'],
    })
  }),
  overrideExisting: false
})

export const {useGetTagsQuery, useAddTagMutation, useDeleteTagMutation, useUpdateTagMutation} = tagApi
