import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './reducers/taskSlice'
import tagReducer from './reducers/tagSlice'
import { taskApi } from "./api/taskApi";
//import { taskAPISlice } from "./api/taskAPISlice";

const store = configureStore({
  reducer:{
    taskstags: taskReducer,
    tags: tagReducer,
    //[taskAPISlice.reducerPath]: taskAPISlice.reducer,
    [taskApi.reducerPath]: taskApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(taskApi.middleware)
  }
})

const printCurrentState = ()=>{
  const state = store.getState()
  //console.log("STATE###", state)
}

store.subscribe(printCurrentState)
export default store