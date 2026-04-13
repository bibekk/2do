import { apiSlice } from "./apiSlice"

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) =>({
    getTasks: builder.query({
      query: ()=> `/task/gettasks`,
      providesTags:['tasks'],
    }),
    getTask: builder.query({
      query:(id)=>`/task/gettask?task_id=${id}`,
      providesTags:  (result, error, id) => [{ type: 'task', id }], //id is passed on component
    }),
    getTasksTags: builder.query({
      query: ()=>`/task/gettasktag`,
      providesTags:['tasktag', 'tasks'],
    }),
    addTask: builder.mutation({
      query: (newtask) => ({
        url: `/task/addtask`,
        method:'POST',
        body: newtask
      }),
      invalidatesTags: ['tasks'],
    }),
    deleteTask:builder.mutation({
      query:(task_id)=>({
        url:`/task/deletetask?task_id=${task_id}`,
        method:'DELETE'
      }),
      invalidatesTags:['tasks'],
    }),
    updateTask:builder.mutation({
      query:(task)=>({
        url:`/task/updateTaskDetail?task_id=${task.task_id}`,
        method:'PUT',
        body: task
      }),
      invalidatesTags:['tasks']
      // Invalidates all queries that subscribe to this Post `id` only.
      //invalidatesTags: (result, error, task) => [{ type: 'task', id: task.task_id }],

    }),
    completeTask: builder.mutation({
      query: ({task_id,status})=>({
        url:`/task/updatetask?task_id=${task_id}&status=${status === 1?0:1}`,
        method: 'PUT'
      }),
      invalidatesTags:['tasks']
    })

  }),
  overrideExisting: false
})

export const {useGetTasksQuery, useGetTasksTagsQuery, useGetTaskQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useCompleteTaskMutation} = taskApi
