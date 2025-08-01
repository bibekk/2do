import { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import { MdDelete, MdPushPin } from 'react-icons/md';
import { FaCircle, FaEdit } from 'react-icons/fa';
import AddTask from './AddTask';
import { base_url } from './Util';
import { FaCircleCheck } from 'react-icons/fa6';
import { Header } from './Header';
import toast from 'react-hot-toast';

import dayjs from 'dayjs';
//import AddTag from './AddTag';
import TagManager from './TagManager';
import Stat from './Stat';
import EditTask from './EditTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState({show:false, task: null})
  const [value, onChange] = useState(new Date())
  const [tags, setTags] = useState([])
  const [tasks, setTasks] = useState([])
  const [taskstags, setTasksTags] = useState([])
  const [refreshdata, setRefreshData] = useState(true)

  const [showTag, setShowTag] =useState(false)

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

  //tests
  // console.log(new Date().toLocaleDateString())
  // console.log(tasks.filter(f=> new Date(f.duedate).toLocaleDateString() === new Date().toLocaleDateString()))
  //const a = dayjs()
  //console.log(a.add(7,'day'))
  //console.log(dayjs().add(1,'day'))
  //console.log(first)

  return (
    <div className='min-h-screen'>
      
      <Header showAddTask={()=>setShowAddTask(true)} />
      
      <div className='grid grid-cols-3 gap-1  bg-gray-600 p-1'>
        
        <div className='flex flex-col gap-1 items-start'>    
          <div className='bg-gray-400 rounded-lg p-1 w-full flex gap-2 flex-wrap'>
            <TagManager reload={()=>setRefreshData(!refreshdata)} />
          </div>

          <div className=' bg-gray-400 p-1 rounded-md w-full'>
            <Stat tasks={tasks} />
          </div>

          <div className=' bg-gray-400 rounded-lg p-1 w-full'>
            <div className='mb-2 bg-gradient-to-r from-gray-500 to-white rounded-md p-1 text-gray-100'>Calendar View</div>

            <Calendar minDate={new Date()}  onChange={onChange} value={value} className='rounded-md p-1 w-full' defaultView='month' tileContent={tileContent} calendarType='gregory'  />
          </div>
        </div>
        
        <div className='flex flex-col  justify-start gap-1'>
          <div className='p-1 bg-gray-400 rounded-lg'>
            <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Due Today</div>
          
            <div className='flex flex-col gap-2 mx-2'>
              <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
                <span className='text-xs text-gray-700  font-bold border-1 border-blue-300 -ml-1.5 rounded-r-xl p-1 bg-gray-100'>{dayjs().format('MMM D,YYYY')}</span>
              
                {tasks.filter(f=> new Date(f.duedate).toLocaleDateString() === new Date().toLocaleDateString()).map((m,i) => {
                  return(
                    <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                      <div className='flex justify-between'>               
                        <span  className='flex' onClick={()=>completeTask(m.completed, m.task_id)}>
                          {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' />}
                          <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                        </span>
                        {/* <span className='text-xs p-1'>{m.duedate}</span> */}
                        <div className='flex gap-0.5 mt-1'>
                          <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                          <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                          {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
                        </div>
                      </div>

                      <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                        {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='w-auto border-1 mt-1 shadow-sm border-gray-400 text-xs bg-gray-300 p-0.5 ml-1 rounded-sm text-blue-600'>{item.tag}</div>)}
                      </div>
                    </div>
                  )
                })}
                {tasks.filter(f=> new Date(f.duedate).toLocaleDateString() === new Date().toLocaleDateString()).length === 0 ? <div className='message'>No due today!</div>:null}

              </div>
            </div>
          </div>

          <div className='p-1 bg-gray-400 rounded-lg'>
            <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Due Tomorrow</div>        
            <div className='flex flex-col gap-2 mx-2'>
              <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
                
                <span className='text-xs text-gray-700  font-bold border-1 border-blue-300 -ml-1.5 rounded-r-xl p-1 bg-gray-100'>{`${dayjs().add(1,'day').format('MMM D,YYYY')}`}</span>
                {tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(1,'day')}`).toDateString()).map((m,i) => {
                  return(
                    <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                      <div className='flex justify-between'>               
                        <span  className='flex' onClick={()=>completeTask(m.completed, m.task_id)}>
                          {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' />}
                          <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                        </span>
                        {/* <span className='text-xs p-1'>{m.duedate}</span> */}
                        <div className='flex gap-0.5 mt-1'>
                          <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                          <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                          {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
                        </div>
                      </div>

                      <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                        {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='w-auto border-1 mt-1 shadow-sm border-gray-400 text-xs bg-gray-300 p-0.5 ml-1 rounded-sm text-blue-600'>{item.tag}</div>)}
                      </div>
                    </div>
                  )
                })}

                {tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(1,'day')}`).toDateString()).length === 0 ? <div className='message'>No due tasks!</div>:null}

              </div>
            </div>
          </div>

          <div className='p-1 bg-gray-400 rounded-lg'>
            <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Past Due</div>        
            <div className='flex flex-col gap-2 mx-2'>
              <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
                
                {/* <span className='text-sm text-gray-300'>{new Date(`${dayjs().add(1,'day')}`).toDateString()}</span> */}
                {tasks.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString())).map((m,i) => {
                  return(
                    <div className={`task task-pastdue ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                      <div className='flex justify-around'>               
                        <span  className='flex' onClick={()=>completeTask(m.completed, m.task_id)}>
                          {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' />}
                          <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                        </span>
                        <span className='text-xs p-1 font-bold'>{m.duedate}</span>
                        <div className='flex gap-0.5 mt-1'>
                          <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                          <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                          {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
                        </div>
                      </div>

                      <div className='flex mt-2 border-t-gray-400 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                        {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='w-auto border-1 mt-1 shadow-sm border-gray-400 text-xs bg-gray-300 p-0.5 ml-1 rounded-sm text-blue-600'>{item.tag}</div>)}
                      </div>
                    </div>
                  )
                })}

                {tasks.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString())).length === 0 ? <div className='message'>No past due tasks!</div>:null}

              </div>
            </div>
          </div>
        </div>
      
        {/* <div className='p-1 bg-gray-400 rounded-lg'>
          <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Monthly</div>

        
          <div className='flex flex-col gap-2 mx-2'>
            <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
              <span className='text-sm'>Week 1</span>
              <div className='task'>
                <div className='flex justify-between'>
                  <span>task1.1</span>
                  <div className='flex gap-1'>
                    <FaEdit className='text-gray-600 hover:text-gray-700 hover:cursor-pointer' onClick={()=>alert('test')} />
                    <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer'/>
                    <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

          <div className='p-1 bg-gray-400 rounded-lg'>
            <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>All</div>
            <div className='p-1 ml-2 flex justify-start'>
              <input type='checkbox' id='show_tag' value='Show Tag' className='h-4 mt-1.5' onClick={()=>setShowTag(!showTag)}/>
              <label htmlFor='show_tag' className='p-1 text-sm'>{showTag?'Hide Tags':'Show Tags'}</label>
            </div>
        
            <div className='flex flex-col gap-2 mx-2'>
              <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
                
                {tasks.map((m,i) => {
                  return(
                    <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                      <div className='flex justify-between'>               
                        <span  className='flex' onClick={()=>completeTask(m.completed, m.task_id)}>
                          {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' />}
                          <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                        </span>
                        {/* <span className='text-xs p-1'>{m.duedate}</span> */}
                        <div className='flex gap-0.5 mt-1'>
                          <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                          <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                          {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
                        </div>
                      </div>

                      {showTag &&
                        <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                        {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='w-auto border-1 mt-1 shadow-sm border-gray-400 text-xs bg-gray-300 p-0.5 ml-1 rounded-sm text-blue-600'>{item.tag}</div>)}
                        </div>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
        </div>

      </div>

      {showAddTask && 
        <AddTask clearDataCallback={()=> setShowAddTask(false)} tags={tags} reload={()=>setRefreshData(!refreshdata)} />
      }

      {showEditTask.show && 
        <EditTask clearDataCallback={()=> setShowEditTask({show: false, task :null})} task={showEditTask.task} tags={tags} taskstags={taskstags} reload={()=>setRefreshData(!refreshdata)} />
      }
  
    </div>
  )
}

export default App
