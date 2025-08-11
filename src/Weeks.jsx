import dayjs from "dayjs"
import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from 'react-icons/fa6';

import { MdDelete } from "react-icons/md"

import weekOfYear from 'dayjs/plugin/weekOfYear'
import { SlArrowRight } from "react-icons/sl"
import { useState } from "react";
import { RiExpandDiagonal2Line } from "react-icons/ri";
import { GiContract } from "react-icons/gi";

const ThreeWeeks = ({tasks, taskstags, setShowEditTask, deleteTask, completeTask, showTag}) => {
  const [expanded, setExpanded] = useState([9999999])
  

  const b = [1,2,3,4,5,6]
  let countWeeks = 0 
  b.map(_week => {
    if(tasks.filter(f=> dayjs(f.duedate).week() === dayjs().week()+_week && f.completed === 0).length > 0){
      countWeeks = 1
    }
  })

  dayjs.extend(weekOfYear)
  //console.log(dayjs().week())
  //removed grow from div below
  return (
    <div className='grow p-1 bg-gray-400 rounded-lg'>
      <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Next 6 Weeks 
        {/* ({tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + 2).padStart(2,'0')).length} {tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + 2).padStart(2,'0')).length > 1 ?'tasks':'task'}) */}

      </div>
      {/* <div className='p-1 ml-2 flex justify-start'>
        <input type='checkbox' id='show_tag' value='Show Tag' className='h-4 mt-1.5' onClick={()=>setShowTag(!showTag)}/>
        <label htmlFor='show_tag' className='p-1 text-sm'>{showTag?'Hide Tags':'Show Tags'}</label>
      </div> */}

                    
      <div className='flex flex-col gap-2 mx-2'>
        {[1,2,3,4,5,6].map( _week => {
          return(
            tasks.filter(f=> dayjs(f.duedate).week() === dayjs().week()+_week && f.completed === 0).length > 0 &&
            <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg' key={_week}>
              <span className='task-date w-fit flex gap-1'>{(dayjs().add(_week,'week')).startOf('week').format('MM/DD/YYYY')} <SlArrowRight className="mt-0.5" /> {(dayjs().add(_week,'week')).endOf('week').format('MM/DD/YYYY')}</span>

              {tasks.filter(f=> dayjs(f.duedate).week() === dayjs().week()+_week && f.completed === 0).map((m,i) => {
                return(
                  <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                    <div className='flex justify-between'>               
                      <span  className='flex flex-grow'>
                        {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer' />:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>completeTask(m.completed, m.task_id)} />}
                        <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
                      </span>
                    <span className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</span>
                    {/* <div className='flex gap-0.5 mt-1'>
                    <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                    <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                    </div> */}
                  </div>

                { expanded.indexOf(m.task_id) > 0 &&
                  <>
                    <div className='bg-gray-300 rounded-md p-1'>{m.note.length > 3 ? m.note:<div className="message_notfound">No Note</div>}</div>
                    <div className='flex mt-1  flex-wrap'>
                      {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                    </div>
                  </>
                }

                {showTag && 
                  <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                    {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                  </div>
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
          {tasks.filter(f=> dayjs(f.duedate).week() === dayjs().week()+ _week).length === 0 ? <div className='message'>No tasks due!</div>:null}
            </div>
          )
        })} 
      </div>
      {
        countWeeks === 0 &&
          <div className='message mb-2'>No tasks due!</div>
      }
    </div>
  )
}

export default ThreeWeeks