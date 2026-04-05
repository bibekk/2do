import dayjs from "dayjs"
import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { GiContract } from "react-icons/gi"
import { RiExpandDiagonal2Line } from "react-icons/ri"
import {  useState } from 'react'
import { MdDelete } from "react-icons/md"


const Days = ({tasks, taskstags, setShowEditTask, deleteTask, completeTask, showTag}) => {
    const [expanded, setExpanded] = useState([9999999])
  
    let countDays = 0 
    let b = [0,1,2,3,4]
    b.map(_day => {
      if(tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).length > 0){
        countDays= 1
      }
    })

  return (
    <div  className='grow  p-1 bg-gray-400 rounded-lg'>
      <div className='task-heading'>Due 5 Days</div> 
      <div className='flex flex-col gap-2 mx-2'>
        {[0,1,2,3,4].map(_day => {
          return(
            tasks.filter(f=> new Date(f.duedate).toDateString() === new Date(`${dayjs().add(_day,'day')}`).toDateString() && f.completed === 0).length > 0 &&
              <div key={_day} className={_day !== 0 ? "space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg":"space-y-1 bg-red-400 rounded-lg p-2 max-w-lg"}>     
                <span className='task-date'>{`${dayjs().add(_day,'day').format('MMM D,YYYY')}`}</span>

                {_day === 0 ? <span className='bg-red-400 p-1 text-xs ml-2 text-gray-100 rounded-md font-bold'>Due Today</span>:null}

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
  )
}

export default Days