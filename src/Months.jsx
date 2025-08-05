import dayjs from "dayjs"
import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"


const ThreeMonths = ({tasks, taskstags, setShowEditTask, deleteTask, completeTask}) => {
  return (
    <div className='grow p-1 bg-gray-400 rounded-lg'>
      <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 mb-2 text-gray-100'>Next 6 Months 
        {/* ({tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + 2).padStart(2,'0')).length} {tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + 2).padStart(2,'0')).length > 1 ?'tasks':'task'}) */}

      </div>
      {/* <div className='p-1 ml-2 flex justify-start'>
        <input type='checkbox' id='show_tag' value='Show Tag' className='h-4 mt-1.5' onClick={()=>setShowTag(!showTag)}/>
        <label htmlFor='show_tag' className='p-1 text-sm'>{showTag?'Hide Tags':'Show Tags'}</label>
      </div> */}
                    
      <div className='flex flex-col gap-2 mx-2'>
        {[1,2,3,4,5,6].map(_month=>{
          return(
          <div key={_month} className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
          <span className='task-date'>{dayjs().add(_month,'M').format('MMM, YYYY')}</span>

          {tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + (_month +1 )).padStart(2,'0') && f.completed === 0).map((m,i) => {
            return(
              <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                <div className='flex justify-between'>               
                  <span  className='flex' onClick={()=>completeTask(m.completed, m.task_id)}>
                    {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer'/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' />}
                    <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                  </span>
                  <span className='text-xs p-1'>{m.duedate}</span>
                  <div className='flex gap-0.5 mt-1'>
                    <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                    <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                    {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
                  </div>
                </div>

                {//showTag &&
                  <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                  {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                  </div>
                }
              </div>
            )
          })}
            {tasks.filter(f=> f.duedate.split('/')[0] === String(new Date().getMonth() + (_month+1)).padStart(2,'0') && f.completed === 0).length === 0 ? <div className='message'>No tasks due!</div>:null}
            </div>
          )
          })
        }
      </div>
    </div>
  )
}

export default ThreeMonths