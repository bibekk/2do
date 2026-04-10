import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './reducers/taskSlice'
import tagReducer from './reducers/tagSlice'

const store = configureStore({
  reducer:{
    taskstags: taskReducer,
    tags: tagReducer,
  }
})

const printCurrentState = ()=>{
  const state = store.getState()
  console.log("STATE###", state)
}

store.subscribe(printCurrentState)
export default store