import { BiTask } from "react-icons/bi"
import { FaTasks } from "react-icons/fa"
import { MdAddCircle } from "react-icons/md"
import { Modal } from "./Modal"
import { AllTasks } from "./AllTasks"
import { useState } from "react"
import { IoPricetagsOutline } from "react-icons/io5"

export const Header = ({showAddTask, taskstags, setShowEditTask, deleteTask, completeTask, setShowTagManager}) => {
  const [showAllTasks, setShowAllTasks] = useState(false)
  
  return (
    <>
      <div className='flex gap-2 justify-between bg-black'>
        <h2 className='text-gray-300 text-3xl p-2 py-3'><BiTask className='float-left mr-2 text-gray-300 text-3xl mt-1'/>2Do</h2>
        <div className="mt-5 text-gray-100 text-sm font-thin ">{new Date().toLocaleDateString()}</div>

        <button onClick={()=>setShowAllTasks(true)}><FaTasks className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='All tasks' /></button>
        
        <button onClick={()=>setShowTagManager(true)}><IoPricetagsOutline className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='Tag' /></button>
        
        <button onClick={showAddTask}><MdAddCircle className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='New task' /></button>
      </div>

      { showAllTasks && 
        <Modal clearDataCallback={()=>setShowAllTasks(false)} title={"All Tasks"} width={'92%'} >
          <AllTasks  taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} />
        </Modal>
      }
    </>
  )
}
