import {  useState } from 'react'
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

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState({show:false, task: null})
  const [showTagManager, setShowTagManager] = useState(false)
  const [_duedate, setDueDate ] = useState(new Date())


  return (
    <div>
      {/* removed min-h-screen */}
      <Header showAddTask={()=>setShowAddTask(true)}   setShowEditTask={setShowEditTask}  setShowTagManager={setShowTagManager} />
        {/* {data.map(m=><div>{m.task_title}</div>)} */}
      {/* {content} */}
      <div className='grid grid-cols-1'>        
        <div className='flex flex-col gap-1 items-start col-span-4 mb-1'>  
            <Cal setDueDate={setDueDate} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
          <div className='flex flex-col  justify-start gap-1 '>
            <TaskDue setShowEditTask={setShowEditTask} />
            <Days  setShowEditTask={setShowEditTask} />
          </div>

          <div className='flex flex-col  justify-start '>
            <Weeks  setShowEditTask={setShowEditTask}  />  
          </div>

          <div className='flex flex-col  justify-start'>
            <Months  setShowEditTask={setShowEditTask}  />  
          </div>

          <div className='flex flex-col  justify-start '>
            <Years  setShowEditTask={setShowEditTask}  />  
          </div>
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
