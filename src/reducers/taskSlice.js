import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../Components/Utils/Util";
import toast from "react-hot-toast"

export const getTaskTags = createAsyncThunk('getTaskTags', async()=>{
    try {
      //console.log('tasktag reducer')
      const resp = await fetch(`${base_url()}/task/gettasktag`)
      const resp_data = await resp.json()
      return resp_data

      //setTasksTags(resp_data)
    }catch(err) {
      console.log(err)
    }  
  })

export const getTasks = createAsyncThunk('getTasks', async ()=>{
    try {
      const resp = await fetch(`${base_url()}/task/gettasks`)
      const resp_data = await resp.json()
      return resp_data
    }catch(err) {
      console.log(err)
    }    
})

export const completeTask = createAsyncThunk('completeTask', async ({stat, tid}) => { 
    try {
      const resp = await fetch(`${base_url()}/task/updatetask?task_id=${tid}&status=${stat === 1?0:1}`,{
        method: 'PUT'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        // toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        //setReload(!reload)
        return {stat: stat,tid: tid}
      }
    }catch(err) {
      console.log(err)
    }   
  })

  export const deleteTask = createAsyncThunk('deleteTask', async (tid) => {
    try {
      const resp = await fetch(`${base_url()}/task/deletetask?task_id=${tid}`,{
        method: 'DELETE'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        return tid
        //setReload(!reload)
      }
    }catch(err) {
      console.log(err)
    }   
  })

  export const addTask = createAsyncThunk('addTask', async({task_title, duedate,note,tags})=>{
    try {
      const resp = await fetch(`${base_url()}/task/addtask`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task_title: task_title, duedate: duedate, note: note, tags: tags})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      //clearDataCallback()
      if(resp_data.changes === 1){
        toast.success("Task Added!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        //reload()
        return true
      }
        }catch(err) {
          console.log(err)
        }
  })

  export const updateTaskDetail = createAsyncThunk('updateTaskDetail', async ({task_id, task_title, note, duedate, tags, completed})=>{
    try {
      const resp = await fetch(`${base_url()}/task/updateTaskDetail?task_id=${task_id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task_title:task_title, note: note, duedate: duedate, tags: tags, completed: completed})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      
      //reload()
      //console.log(resp_data)
      if(resp_data === true) {
        toast.success("Task Updated!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        return true
      }

    }catch(err) {
      console.log(err)
    }
  })

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    isLoading: false,
    data: [],
    tasks:[],
    error: false,
    reload: false,
  },

  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getTaskTags.pending, (state, action ) =>{
      state.isLoading = true
    })

    builder.addCase(getTaskTags.fulfilled, (state, action ) => {
      //console.log('fulfilled', action.payload)
      state.isLoading = false
      state.data = action.payload
      //console.log(action.payload)
    })

    builder.addCase(getTasks.fulfilled, (state, action) =>{
      state.isLoading = false
      state.tasks = action.payload.map(m=> ({...m,expanded:true}))
    })

    builder.addCase(completeTask.fulfilled, (state,action) => {
      // state.tasks.forEach((v,i)=>{
      //   if(v.task_id === action.payload.tid){
      //   console.log(v.task_id, v.completed)

      //   }
      // })
      state.tasks = state.tasks.map(m=> m.task_id === parseInt(action.payload.tid) ?{...m, completed: action.payload.stat === 0 ? 1: 0}:m )
      state.data = state.data.map(m=> m.task_id === parseInt(action.payload.tid) ?{...m,completed: action.payload.stat === 0 ? 1: 0}:m )
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(f=> f.task_id !== action.payload)
      state.data = state.data.filter(f=> f.task_id !== action.payload)
    })

    builder.addCase(addTask.fulfilled, (state) => {
      //let p = action.payload
      state.reload = !state.reload
      //state.tasks.push({task_id: p.task_id, task_title: p.task_title, duedate: p.duedate, note: p.note, tags: p.tags, pin: 0, completed: 0, deleted: 0 })
      //state.data.push({task_id: p.task_id, task_title: p.task_title, duedate: p.duedate, note: p.note, tags: p.tags, pin: 0, completed: 0, deleted: 0, tag_id, tag:  })
    })

    builder.addCase(updateTaskDetail.fulfilled, (state )=> {
      state.reload = !state.reload
    })
  }
})

export default taskSlice.reducer

//