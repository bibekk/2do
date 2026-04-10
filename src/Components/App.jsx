import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import AddTask from './Task/AddTask';
import { Header } from './Utils/Header';
import TagManager from './Tags/TagManager';
import EditTask from './Task/EditTask';
import Months from './Months';
import Weeks from './Weeks';
import _ from 'lodash'
import Cal from './Cal';
import Years from './Years';
import Days from './Days';
import TaskDue from './TaskDue';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, getTaskTags } from '../reducers/taskSlice';
import { getTags } from '../reducers/tagSlice';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState({show:false, task: null})
  const [showTagManager, setShowTagManager] = useState(false)
  const [_duedate, setDueDate ] = useState(new Date())

  //redux
  const dispatch = useDispatch()
  const reload = useSelector((state) => state.taskstags.reload)

  useEffect(()=>{
    dispatch(getTags())
    dispatch(getTasks())
    dispatch(getTaskTags())
  }, [reload])


  return (
    <div className='min-h-screen'>
      
      <Header showAddTask={()=>setShowAddTask(true)}   setShowEditTask={setShowEditTask}  setShowTagManager={setShowTagManager} />
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  bg-gray-600 p-1'>   
        
        <div className='flex flex-col gap-1 items-start col-span-4'>  
          <div className=' bg-gray-400 rounded-lg p-1 w-full'>
            <Cal setDueDate={setDueDate} />
          </div>
        </div>

        <div className='flex flex-col  justify-start gap-2'>
          <TaskDue setShowEditTask={setShowEditTask} />
          <Days  setShowEditTask={setShowEditTask} />
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Weeks  setShowEditTask={setShowEditTask}  />  
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Months  setShowEditTask={setShowEditTask}  />  
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Years  setShowEditTask={setShowEditTask}  />  
        </div>

      </div>

      { showAddTask && 
        <AddTask clearDataCallback={()=> setShowAddTask(false)}  _duedate={_duedate} />
      }

      { showEditTask.show && 
        <EditTask clearDataCallback={()=> setShowEditTask({show: false, task :null})} task={showEditTask.task} />
      }

      { showTagManager &&
        <TagManager  clearDataCallback={()=>setShowTagManager(false)} />
      }

    </div>
  )
}

export default App
