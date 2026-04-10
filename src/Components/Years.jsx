import dayjs from "dayjs"
import { useState } from "react"
import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { GiContract } from "react-icons/gi"
import { MdDelete } from "react-icons/md"
import { RiExpandDiagonal2Line } from "react-icons/ri"
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { completeTask, deleteTask } from "../reducers/taskSlice"


const Years = ({ setShowEditTask}) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState([9999999])
  const tasks = useSelector((state) => state.taskstags.tasks)
  const taskstags = useSelector((state) => state.taskstags.data)

  let countYears = 0 
  if(tasks.filter(f=> f.duedate.split('/')[2] === String(new Date().getFullYear() + 1 ).padStart(2,'0') && f.completed === 0).length > 0){
      countYears = 1
  }
  const ny = tasks.filter(f=> f.duedate.split('/')[2] === String(new Date().getFullYear() +1 ).padStart(2,'0') && f.completed === 0)

  return (
    <div className='grow p-1 bg-gray-400 rounded-lg'>
      <div className='task-heading'>Next Year 
      </div>
                    
      <div className='flex flex-col gap-2 mx-2'>
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(_month=>{
          if(tasks.filter(f=> f.duedate.split('/')[2] === String(new Date().getFullYear() + 1).padStart(2,'0') && f.completed === 0 && f.duedate.split('/')[0] === String(_month + 1).padStart(2,'0') ).length === 0){
            return null
          }
          return(
            <div key={_month} className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
              <span className='task-date w-fit flex gap-1'>{dayjs().month(_month).format('MMM')} {String(new Date().getFullYear() + 1)}</span>

              {_.sortBy(ny,'duedate').filter(f=> f.duedate.split('/')[2] === String(new Date().getFullYear() + 1).padStart(2,'0') && f.completed === 0 && f.duedate.split('/')[0] === String(_month + 1).padStart(2,'0')).map((m,i) => {
                return(
                  <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                    <div className='flex justify-between'>               
                      <span  className='flex flex-grow'>
                        {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer' />:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>dispatch(completeTask({stat:m.completed,tid: m.task_id}))} />}
                        <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
                      </span>
                      <span className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</span>
                    </div>

                    { expanded.indexOf(m.task_id) > 0 && //m.expanded && // 
                      <>
                        <div className='bg-gray-300 rounded-md p-1'>{m.note.length > 3 ? m.note:<div className="message_notfound">No Note</div>}</div>
                        <div className='flex mt-1 flex-wrap'>
                          {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                        </div>
                      </>
                    }

                    <div className='flex justify-between border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 mt-1'>                      
                      <div className='flex gap-1  mt-1'>
                        <FaEdit className='text-gray-600 text-lg hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                        <MdDelete className='text-red-400 text-lg hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm(`Are you sure you want to delete "${m.task_title}"?`)) {dispatch(deleteTask(m.task_id))}}}/>
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
              
              {tasks.filter(f=> f.duedate.split('/')[2] === String(new Date().getFullYear() + 1).padStart(2,'0') && f.completed === 0 && f.duedate.split('/')[0] === String(_month + 1).padStart(2,'0') ).length === 0? <div className='message'>No tasks due!</div>:null}
            </div>
          )})}
      </div>
      {/* {
        countYears === 0 &&
          <div className='message mb-2'>No tasks due!</div>
      } */}
    </div>
  )
}

export default Years