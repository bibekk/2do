import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import { MdDelete } from 'react-icons/md';
import { FaCircle, FaEdit } from 'react-icons/fa';
import AddTask from './AddTask';
import { base_url } from './Util';
import { FaCircleCheck } from 'react-icons/fa6';
import { Header } from './Header';
import TagManager from './TagManager';
import Stat from './Stat';
import EditTask from './EditTask';
import Months from './Months';
import Weeks from './Weeks';

import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { RiExpandDiagonal2Line } from 'react-icons/ri';
import { GiContract } from 'react-icons/gi';
import _ from 'lodash'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState({show:false, task: null})
  const [value, onChange] = useState(new Date())
  const [tags, setTags] = useState([])
  const [tasks, setTasks] = useState([])
  const [taskstags, setTasksTags] = useState([])
  const [refreshdata, setRefreshData] = useState(true)
  const [expanded, setExpanded] = useState([9999999])
  const [showTag, setShowTag] =useState(false)
  const [showTagManager, setShowTagManager] = useState(false)


  const getTags = async ()=>{
    try {
      const resp = await fetch(`${base_url()}/tag/gettags`)
      const resp_data = await resp.json()
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

  const deleteTask = async (tid) => {
    try {
      const resp = await fetch(`${base_url()}/task/deletetask?task_id=${tid}`,{
        method: 'DELETE'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        setRefreshData(!refreshdata)
      }
    }catch(err) {
      console.log(err)
    }   
  }

  const completeTask = async (stat, tid) => {
    try {
      const resp = await fetch(`${base_url()}/task/updatetask?task_id=${tid}&status=${stat === 1?0:1}`,{
        method: 'PUT'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        // toast.success("Task removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        setRefreshData(!refreshdata)
      }
    }catch(err) {
      console.log(err)
    }   
  }

  useEffect(()=>{
    getTags()
    getTasks()
    getTaskTags()
  },[refreshdata])

  const tileContent = ({date,view})=>{
    for(var i=0; i < tasks.length; i++){
      //console.log(new Date(v.duedate).toLocaleDateString(), new Date(date).toLocaleDateString())
      //console.log(view)
      //console.log(v.duedate)
     // console.log(new Date(date).toDateString(), new Date(v.duedate).toDateString())
      if(view === 'month' && date.toLocaleDateString() === new Date(tasks[i].duedate).toLocaleDateString()){
        const incomplate_tasks = tasks.filter(f=>  date.toLocaleDateString() === new Date(f.duedate).toLocaleDateString() && f.completed === 0)
        
        if(incomplate_tasks.length > 0 ){
          let title = incomplate_tasks.map((m,j)=>`\n${j+1}. ${m.task_title}\n`)
          title = title.join('')

          return(
            <div className=' bg-gray-300 rounded-md font-thin text-blue-700 text-xs  border-gray-500 border-1 shadow-md hover:bg-gray-500 hover:text-white'>
              <div title={title}>{incomplate_tasks.length}</div>
              {/* {tasks.filter(f=>  date.toLocaleDateString() === new Date(f.duedate).toLocaleDateString()).length > 1? 'tasks':'task'}
              */}
              {/* {tasks.filter(f=>  date.toLocaleDateString() === new Date(f.duedate).toLocaleDateString()).map(m=> <div></div>)} */}
            </div>
            )
        }
      }
    }
  }

  let countDays = 0 
  let b = [0,1,2,3,4]
  b.map(_day => {
    if(tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).length > 0){
      countDays= 1
    }
  })

  let _tasksDue = _.uniqBy(taskstags,'task_id')
  _tasksDue = _tasksDue.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString()))
 // console.log(showTag)
  //console.log(expanded)
  

  return (
    <div className='min-h-screen'>
      
      <Header showAddTask={()=>setShowAddTask(true)}  taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} setShowTagManager={setShowTagManager} />
      
      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1  bg-gray-600 p-1'>   
        <div className=' flex flex-col  justify-start gap-1'>
          {_tasksDue.length > 0 &&
            <div  className='grow  p-1 bg-gray-400 rounded-lg'>
              <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Past Due</div> 
                <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>     
                {
                _tasksDue.map(m=>{
                  return(
                    <div className={`task task-pastdue ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                      <div className='flex justify-between'>               
                        <span  className='flex flex-grow'>
                          {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>completeTask(m.completed, m.task_id)} />}
                          <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
                        </span>
                        <span className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</span>
                      </div>

                      { expanded.indexOf(m.task_id) > 0 &&
                        <>
                          <div className='bg-gray-300 rounded-md p-1'>{m.note.length > 3 ? m.note:<div className="message_notfound">No Note</div>}</div>
                          <div className='flex mt-1  flex-wrap'>
                            {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                          </div>
                          </>
                      }

                      <div className='flex justify-between border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 mt-1'>                      
                        <div className='flex gap-1  mt-1'>
                          <FaEdit className='text-gray-600 text-lg hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                          <MdDelete className='text-red-400 text-lg hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm(`Are you sure you want to delete "${m.task_title}"?`)) {deleteTask(m.task_id)}}}/>
                        </div>

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
          }
          <div  className='grow  p-1 bg-gray-400 rounded-lg'>
            <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Due 5 Days</div> 
              <div className='flex flex-col gap-2 mx-2'>
                {[0,1,2,3,4].map(_day => {
                  return(
                    tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).length > 0 &&
                      <div key={_day} className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>     
                        <span className='task-date'>{`${dayjs().add(_day,'day').format('MMM D,YYYY')}`}</span>
                        {_day === 0 ? <span className='bg-green-200 p-1 text-xs ml-2 rounded-md font-bold'>Today</span>:null}
                        {tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).map((m,i) => {
                          return(
                            <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                              <div className='flex justify-between'>               
                                <span  className='flex flex-grow'>
                                  {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>completeTask(m.completed, m.task_id)} />}
                                  <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
                                </span>
                                <span className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</span>
                              </div>

                              { expanded.indexOf(m.task_id) > 0 &&
                                <>
                                  <div className='bg-gray-300 rounded-md p-1'>{m.note.length > 3 ? m.note:<div className="message_notfound">No Note</div>}</div>
                                  <div className='flex mt-1  flex-wrap'>
                                    {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                                  </div>
                                  </>
                              }

                              <div className='flex justify-between border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 mt-1'>                      
                                <div className='flex gap-1  mt-1'>
                                  <FaEdit className='text-gray-600 text-lg hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                                  <MdDelete className='text-red-400 text-lg hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm(`Are you sure you want to delete "${m.task_title}"?`)) {deleteTask(m.task_id)}}}/>
                                </div>

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
                        })}

                        {tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).length === 0 ? <div className='message'>No tasks due!</div>:null}
                      </div>
                  )}
                )}
              </div>
            {
              countDays === 0 &&
              <div className='message mb-2'>No tasks due!</div>
            }
          </div>
        </div>

        <div className=' flex flex-col  justify-start gap-1'>
          <Weeks tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag} />  
        </div>

        <div className='flex flex-col  justify-start gap-1'>
          <Months tasks={tasks} taskstags={taskstags} setShowEditTask={setShowEditTask} deleteTask={deleteTask} completeTask={completeTask} showTag={showTag}/>  
        </div>

        <div className=' flex flex-col gap-1 items-start'>  
          <div className=' bg-gray-400 p-1 rounded-md w-full'>
            <Stat tasks={tasks} />
          </div>

          <div className=' bg-gray-400 rounded-lg p-1 w-full'>
            <div className='mb-2 bg-gradient-to-r from-gray-500 to-white rounded-md p-1 text-gray-100'>Calendar View</div>

            <Calendar minDate={new Date()}  onChange={onChange} value={value} className='rounded-md p-1 w-full' defaultView='month' tileContent={tileContent} calendarType='gregory'  />
          </div>

        </div>
      </div>

      { showAddTask && 
        <AddTask clearDataCallback={()=> setShowAddTask(false)} tags={tags} reload={()=>setRefreshData(!refreshdata)} />
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
