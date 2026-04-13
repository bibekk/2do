import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { GiContract } from "react-icons/gi"
import { MdDelete } from "react-icons/md"
import { RiExpandDiagonal2Line } from "react-icons/ri"
import _ from 'lodash'
import { useState } from "react"
import { useCompleteTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useGetTasksTagsQuery } from "../api/taskApi"
import toast from "react-hot-toast"


const TaskDue = ({  setShowEditTask}) => {
  const [expanded, setExpanded] = useState([9999999])
   //rtk query
  //const {data: tasks, isLoading , isSuccess,  isError, error } = useGetTasksQuery()
  const {data: taskstags, isLoading: isLoading, isError} = useGetTasksTagsQuery()
  const [ completeTask ] = useCompleteTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleDeleteTask = async(id) =>{
    try{
      await deleteTask(id).unwrap()
      //console.log(isLoadingDelete)
      toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
    }catch{
      console.log('Error')
      toast.error("Error deleting!")
    }
  }

  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return(<div>Something went wrong!</div>)
  }

  let _tasksDue = _.uniqBy(taskstags,'task_id')
  _tasksDue = _tasksDue.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString()))
  
  if(_tasksDue.length > 0 ){
    return (
        <div  className='grow  p-1 bg-gray-400 rounded-lg'>
          <div className='task-heading'>Past Due</div> 
            <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>     
            {
            _tasksDue.map(m=>{
              return(
                <div className={`task task-pastdue ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                  <div className='flex justify-between'>               
                    <span  className='flex flex-grow'>
                      {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-lg text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-lg text-white hover: cursor-pointer hover:text-blue-500' onClick={async()=>await completeTask({task_id: m.task_id, status:m.completed})} />}
                      <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
                    </span>
                  </div>

                  { expanded.indexOf(m.task_id) > 0 &&
                    <>
                      <div className='task-note'>{m.note.length > 3 ? m.note:<div className="message_notfound">No Note</div>}</div>
                      <div className='flex mt-1  flex-wrap'>
                        {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                      </div>
                      </>
                  }
                  <div className='flex justify-between border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0  mt-2 bg-green-50 rounded-lg p-1'>                          
                    <div className='flex gap-1  mt-1'>
                      <FaEdit className='text-gray-600 text-lg hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                      <MdDelete className='text-red-400 text-lg hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm(`Are you sure you want to delete "${m.task_title}"?`)) {handleDeleteTask(m.task_id)}}}/>
                    </div>
                    <span className='text-xs p-1 content-center ml-2 mr-2 font-semibold'>{m.duedate}</span>
                    <div className='mt-1'>
                      { expanded.indexOf(m.task_id) === -1 &&
                          <RiExpandDiagonal2Line className='hover:text-blue-400 hover:cursor-pointer text-lg' onClick={()=>setExpanded([...expanded,m.task_id])}/>
                      }
                      { expanded.indexOf(m.task_id) > 0 &&
                          <GiContract className=' hover:text-blue-400 hover:cursor-pointer text-lg' onClick={()=>setExpanded(expanded.filter(f=> f !== m.task_id))}/>
                      }
                    </div>
                  </div>
                </div>
              )
            })
          } 
        </div>
        </div>   
    )
  }else{
    return null
  }
}

export default TaskDue