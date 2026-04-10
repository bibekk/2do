import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { base_url } from "../Components/Utils/Util"
import toast from "react-hot-toast"


export const getTags = createAsyncThunk('getTags',async ()=>{
    try {
      const resp = await fetch(`${base_url()}/tag/gettags`)
      const resp_data = await resp.json()
      //console.log(resp_data)
      return resp_data
    }catch(err) {
      console.log(err)
    }    
  })

  export  const deleteTag = createAsyncThunk('deleteTag', async (tid) => {
    try {
      const resp = await fetch(`${base_url()}/tag/deletetag?tag_id=${tid}`,{
        method: 'DELETE'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        toast.success("Tag removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        return tid
      }else{
        toast.error(resp_data,{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
      }
    }catch(err) {
      console.log(err)
      toast.error("Unexpected Error!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
    }   
  })

  export const addTag = createAsyncThunk('addTag', async({ tag, note} )=>{
    try {
          const resp = await fetch(`${base_url()}/tag/addtag`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tag: tag, note: note})
          })
    
          const resp_data = await resp.json()
          //console.log(resp_data)
          //clearDataCallback()
          //refreshData()
          //if(resp_data)
          if(resp_data.status === true){
            toast.success("Tag Added!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
            return {tag_id: resp_data.lastInsertRowid, tag: tag, note: note}
          }
    
        }catch(err) {
          console.log(err)
        }
  })

  export const updateTag = createAsyncThunk('updateTag', async ({tag_id, tag, note})=>{
    try {
      const resp = await fetch(`${base_url()}/tag/updatetag?tag_id=${tag_id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tag: tag, note: note})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      if(resp_data === true) {
        toast.success("Tag Updated!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        return {tag_id: tag_id, tag: tag, note: note}
      }

    }catch(err) {
      console.log(err)
    }
  })

  const tagSlice = createSlice({
    name: 'tags',
    initialState: {
      isLoading: false, 
      data: [],
      refreshdata: true
    },

    reducers: {
      setRefreshData: (state,action)=>{
        state.refreshdata = !state.refreshdata
      },
    },

    extraReducers: (builder)=>{
      builder.addCase(getTags.pending, (state) => {
        state.isLoading = true
      })

      builder.addCase(getTags.fulfilled, (state, action) => {
        state.data = action.payload
      })

      builder.addCase(deleteTag.fulfilled, (state, action) => {
        state.data.filter(f=> f.id !== action.payload)
        state.refreshdata = !state.refreshdata
      })

      builder.addCase(addTag.fulfilled, (state,action)=> {
        //console.log(action)
        state.data.push({tag_id: action.payload.tag_id, tag: action.payload.tag, note: action.payload.note })
      })

      builder.addCase(updateTag.fulfilled, (state,action)=> {
        const p = action.payload
        state.data = state.data.map(m=> m.tag_id ==p.tag_id ? {...m,tag: p.tag, note: p.note }:m)
      })

    }
  })
  export const {setRefreshData} = tagSlice.actions
  export default tagSlice.reducer