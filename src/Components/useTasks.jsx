import { useEffect, useState } from 'react'
import { base_url } from './Utils/Util'
import toast from 'react-hot-toast';

const useTasks = () => {
  const [tags, setTags] = useState([])
  const [taskstags, setTasksTags] = useState([])
  const [tasks, setTasks] = useState([])
  const [reload, setReload] = useState(true)

  
  const getTags = async ()=>{
    try {
      const resp = await fetch(`${base_url()}/tag/gettags`)
      const resp_data = await resp.json()
      //console.log(resp_data)
      setTags(resp_data)
    }catch(err) {
      console.log(err)
    }    
  }

  const getTaskTags = async ()=>{
    try {
      const resp = await fetch(`${base_url()}/task/gettasktag`)
      const resp_data = await resp.json()
      setTasksTags(resp_data)
    }catch(err) {
      console.log(err)
    }    
  }

  const getTasks = async ()=>{
    try {
      const resp = await fetch(`${base_url()}/task/gettasks`)
      const resp_data = await resp.json()
      setTasks(resp_data)
    }catch(err) {
      console.log(err)
    }    
  }

  // const completeTask = async (stat, tid) => {
  //   try {
  //     const resp = await fetch(`${base_url()}/task/updatetask?task_id=${tid}&status=${stat === 1?0:1}`,{
  //       method: 'PUT'
  //     })
  //     const resp_data = await resp.json()
  //     if(resp_data === true){
  //       // toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
  //       setReload(!reload)
  //     }
  //   }catch(err) {
  //     console.log(err)
  //   }   
  // }

  // const deleteTask = async (tid) => {
  //   try {
  //     const resp = await fetch(`${base_url()}/task/deletetask?task_id=${tid}`,{
  //       method: 'DELETE'
  //     })
  //     const resp_data = await resp.json()
  //     if(resp_data === true){
  //       toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
  //       setReload(!reload)
  //     }
  //   }catch(err) {
  //     console.log(err)
  //   }   
  // }

  return {getTags, tags, getTaskTags, taskstags, getTasks, tasks, reload}
}

export default useTasks