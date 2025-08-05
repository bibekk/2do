import { BiTask } from "react-icons/bi"
import { FaTasks } from "react-icons/fa"
import { MdAddCircle } from "react-icons/md"
import { Modal } from "./Modal"
import { AllTasks } from "./AllTasks"
import { useState } from "react"

export const Header = ({showAddTask, taskstags, setShowEditTask, deleteTask, completeTask}) => {
  const [showAllTasks, setShowAllTasks] = useState(false)
  
  return (
    <>
      <div className='flex gap-2 justify-between bg-black'>
        <h2 className='text-gray-300 text-3xl p-2 py-3'><BiTask className='float-left mr-2 text-gray-300 text-3xl mt-1'/>2Do</h2>

        <button onClick={()=>setShowAllTasks(true)}><FaTasks className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='New task' /></button>
        
        <button onClick={showAddTask}><MdAddCircle className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='New task' /></button>
      </div>

      { showAllTasks && 
        <Modal clearDataCallback={()=>setShowAllTasks(false)} title={"All Tasks"} >
          <AllTasks  taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask}/>
        </Modal>
      }
    </>
  )
}
