import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import AddTask from './AddTask';
import { Header } from './Header';
import TagManager from './TagManager';
import EditTask from './EditTask';
import Months from './Months';
import Weeks from './Weeks';
import _ from 'lodash'
import Cal from './Cal';
import Years from './Years';
import Days from './Days';
import useTasks from './useTasks';
import TaskDue from './TaskDue';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState({show:false, task: null})
  const [refreshdata, setRefreshData] = useState(true)
  const [showTag, setShowTag] =useState(false)
  const [showTagManager, setShowTagManager] = useState(false)
  const { getTags, tags, getTaskTags, taskstags , getTasks, tasks, completeTask, reload, deleteTask} = useTasks()
  const [_duedate, setDueDate ] = useState(new Date())


  useEffect(()=>{
    getTags()
    getTasks()
    getTaskTags()
  },[reload, refreshdata])


  return (
    <div className='min-h-screen'>
      
      <Header showAddTask={()=>setShowAddTask(true)}  taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} setShowTagManager={setShowTagManager} />
      
      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  bg-gray-600 p-1'>   
        
        <div className=' flex flex-col gap-1 items-start col-span-4'>  
          <div className=' bg-gray-400 rounded-lg p-1 w-full'>
            <Cal refreshdata={reload || refreshdata} setDueDate={setDueDate} />
          </div>
        </div>

        <div className=' flex flex-col  justify-start gap-2'>
          <TaskDue taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} />

          <Days tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag}/>

        </div>

        <div className=' flex flex-col  justify-start gap-1'>
          <Weeks tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag} />  
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Months tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag}/>  
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Years tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag}/>  
        </div>

      </div>

      { showAddTask && 
        <AddTask clearDataCallback={()=> setShowAddTask(false)} tags={tags} reload={()=>setRefreshData(!refreshdata)} _duedate={_duedate} />
      }

      { showEditTask.show && 
        <EditTask clearDataCallback={()=> setShowEditTask({show: false, task :null})} task={showEditTask.task} tags={tags} taskstags={taskstags} reload={()=>setRefreshData(!refreshdata)} />
      }

      {showTagManager &&
        <TagManager reload={()=>setRefreshData(!refreshdata)} taskstags={taskstags} setShowTag={setShowTag} showTag={showTag} clearDataCallback={()=>setShowTagManager(false)} />
      }

      
    </div>
  )
}

export default App
