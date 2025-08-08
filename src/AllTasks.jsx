import { useState } from "react"
import { FaCircle, FaEdit } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import Paging from "./Paging"
import _ from 'lodash'

export const AllTasks = ({ taskstags, setShowEditTask, deleteTask, completeTask}) => { 
  const [showTag, setShowTag] =useState(false)
  const [showPastDue, setShowPastDue] =useState(false)
  const [showCompleted, setShowCompleted] =useState(false)
  const [showAll, setShowAll] =useState(false)
  const [showPending, setShowPending] =useState(true)
  const [selectedTagID, setSelectedTagID] = useState(null)
  const PERPAGE = 5
  const [perPage, setPerPage] = useState(PERPAGE)
  const [paging, setPaging] = useState({ top: perPage, skip: 0, currentPage: 1 })

  //#region paging
  const nextPage = () => {
    let _currentPage = Number(paging.currentPage) + 1
    setPaging((prevState) => ({ ...prevState, currentPage: _currentPage }))
  }

  const prevPage = () => {
    let _currentPage = Number(paging.currentPage) - 1
    setPaging((prevState) => ({ ...prevState, currentPage: _currentPage }))
  }

  const goToPage = (p) => {
    let _currentPage = p
    setPaging((prevState) => ({ ...prevState, currentPage: _currentPage }))
  }
//#endregion paging

  let _tasks = _.uniqBy(taskstags,'task_id')

  if(selectedTagID !== null){
    _tasks = taskstags.filter(f=> f.tag_id === selectedTagID)
  }

  if(showPastDue){
    _tasks = _tasks.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString()))
  }

  if(showCompleted){
    _tasks = _tasks.filter(f=> f.completed === 1)
  }

  if(showAll){
    _tasks = _tasks
  }

  if(showPending){
    _tasks = _tasks.filter(f => f.completed === 0 )
  }

  _tasks = _.orderBy(_tasks,'duedate')

  let _data = []
  const _chunkData = _.chunk(_tasks, paging.top)

  let _currentPage = paging.currentPage
    if(_chunkData[paging.currentPage - 1 ] === undefined){
      _currentPage = 1
    }
    //console.log(_chunkData)

    //console.log(_chunkData,paging.currentPage)
    if(_chunkData.length > 0 ){
    _data = _chunkData[_currentPage - 1 ].map((m, index) => {
      return(
        <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
          <div className='flex justify-between'>               
            <span  className='flex flex-grow'>
              {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer' onClick={()=>completeTask(m.completed, m.task_id)}/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>completeTask(m.completed, m.task_id)} />}
              <span className={m.completed?'line-through italic p-1':'font-normal'}>{m.task_title}</span>
            </span>
            <div className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</div>
            <div className='flex gap-1 mt-1'>
              <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
              <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
              {/* <MdPushPin className='text-blue-500 hover:cursor-pointer hover:text-blue-600'/> */}
            </div>
          </div>

          {showTag &&
            <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
            {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
            </div>
          }
        </div>
      )
    })
    }else{
      _data=<div className="message">Data not found</div>
    }

  return (
    <div className="grid grid-cols-8 gap-2 overflow-auto max-h-[60%]">
      <div className='col-span-8 sm:col-span-6 order-2 p-1 bg-gray-400 rounded-lg w-full'>
        <div className="flex gap-2 bg-gray-100 rounded-md ml-3 p-0.5">
          <div className='font-bold rounded-md text-sm w-fit p-1 ml-3'>{_tasks.length} {_tasks.length > 1 ?'tasks':'task'}</div>
          <input type='checkbox' id='show_tag' value='Show Tag' className='h-4 w-4 mt-1.5' onClick={()=>setShowTag(!showTag)}/>
          <label htmlFor='show_tag' className='p-1 text-sm mr-2'>{showTag?'Hide Tags':'Show Tags'}</label>
          <span className="text-sm mt-1 font-thin">Tag:</span><div className='bg-gray-300 rounded-md text-sm w-fit p-1'>{selectedTagID!== null?taskstags.filter(f=> f.tag_id === selectedTagID)[0].tag:'All'}</div>
        </div>
        
        <div className='p-1 ml-2 flex justify-start mt-1 mb-1'>

          <div className="bg-gray-100 rounded-md p-0.5 pl-1 flex font-thin">
            <input type='radio' id='show_pastdue' name='porc' value='Show Past' className='h-4 w-4 mt-1.5' onClick={()=>{setShowPastDue(true);setShowCompleted(false); setShowAll(false); setShowPending(false);setPaging((prevState) => ({ ...prevState, currentPage: 1 })) }}/>
            <label htmlFor='show_pastdue' className='p-1 text-sm'>Past Due</label>

            <input type='radio' id='show_completed' name='porc' value='Show Completed' defaultChecked={showCompleted === true?true:false} className='h-4 w-4 mt-1.5' onClick={()=>{setShowCompleted(true); setShowPastDue(false); setShowPending(false); setShowPastDue(false);setPaging((prevState) => ({ ...prevState, currentPage: 1 }))}}/>
            <label htmlFor='show_completed' className='p-1 text-sm'>Completed</label> 
            
            <input type='radio' id='show_all' name='porc' value='Show All' defaultChecked={showAll === true?true:false} className='h-4 w-4 mt-1.5' onClick={()=>{setShowAll(true); setShowCompleted(false); setShowPastDue(false) ;setShowPending(false);setPaging((prevState) => ({ ...prevState, currentPage: 1 }))}}/>
            <label htmlFor='show_all' className='p-1 text-sm'>All</label>

            <input type='radio' id='show_pending' name='porc' value='Show Pending' defaultChecked={showPending === true?true:false} className='h-4 w-4 mt-1.5' onClick={()=>{setShowPending(true); setShowAll(false); setShowCompleted(false); setShowPastDue(false);setPaging((prevState) => ({ ...prevState, currentPage: 1 }))}}/>
            <label htmlFor='show_pending' className='p-1 text-sm'>Pending</label>
          </div>

        </div>

        <div className="ml-3 flex gap-2 mb-2 bg-gray-200 rounded-md w-fit p-1">
          <div className="font-thin text-sm mt-1">Per Page:</div>
          <select id='per_page' className="w-15 bg-gray-300 h-8" onChange={(e)=>{setPerPage(e.target.value);setPaging((prevState) => ({ ...prevState, top: e.target.value }))}}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
          <Paging total={_tasks.length} itemsPerPage={paging.top} nextHandler={nextPage} prevHandler={prevPage} currentPage={paging.currentPage} goToPageHandler={goToPage}></Paging>
        </div>

        {_tasks.length > 0 &&
          <div className='flex flex-col gap-2 mx-2'>
            <div className='space-y-1 bg-gray-500 rounded-lg p-2 max-w-lg'>
              {_data}
              {/* {_tasks.map((m,i) => {
                return(
                  <div className={`task ${m.completed === 1 ?'bg-green-100!':null}`} key={m.task_id}>
                    <div className='flex justify-between'>               
                      <span  className='flex flex-grow'>
                        {m.completed === 1? <FaCircleCheck className=' mr-2 mt-1 text-green-500 hover:text-blue-500 hover:cursor-pointer' onClick={()=>completeTask(m.completed, m.task_id)}/>:<FaCircle className='float-left mr-2 mt-1 text-white hover: cursor-pointer hover:text-blue-500' onClick={()=>completeTask(m.completed, m.task_id)} />}
                        <span className={m.completed?'line-through italic p-1':null}>{m.task_title}</span>
                      </span>
                      <div className='text-xs p-1 content-center ml-2 mr-2'>{m.duedate}</div>
                      <div className='flex gap-1 mt-1'>
                        <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={()=>setShowEditTask({show: true, task: m})} />
                        <MdDelete className='text-red-400 hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTask(m.task_id)}}}/>
                      </div>
                    </div>

                    {showTag &&
                      <div className='flex mt-2 border-t-gray-300 border-1 border-b-0 border-l-0 border-r-0 pt-1 flex-wrap'>
                      {taskstags.filter(f=> f.task_id ===m.task_id).map(item => <div key={item.tag_id} className='task-tag'>{item.tag}</div>)}
                      </div>
                    }
                  </div>
                )
              })} */}
            </div>
          </div>
        }

        { _tasks.length === 0 &&
          <div className='message'>No tasks due!</div>
        }
      </div>

      <div className="col-span-8  sm:w-full sm:col-span-2 order-1 text-sm">
        <div className="bg-gray-300 mt-4 rounded-md p-1">

          {/* <div  className={`hover:text-blue-500 hover:cursor-pointer bg-gray-400 m-0.5 rounded-md p-1 ${selectedTagID === null?'text-blue-300 bg-gray-500':null}`}>
            <div className={selectedTagID === null?'text-blue-300 bg-gray-500 ml-2':null} onClick={()=>setSelectedTagID(null)}>Show All</div>
          </div> */}
          <div className="flex flex-wrap">
            <div className={`hover:text-blue-500 hover:cursor-pointer m-0.5 p-1 bg-gray-400 rounded-md ${selectedTagID === null?'text-blue-600 bg-gray-500!':null}}`} onClick={()=>setSelectedTagID(null)}>All</div>

            {_.uniqBy(taskstags,'tag_id').map(m=>{
              return(
                <div key={m.tag_id} className={`hover:text-blue-500 hover:cursor-pointer m-0.5 p-1 bg-gray-400 rounded-md ${m.tag_id === selectedTagID? 'bg-gray-500!':null}`} onClick={()=>{setSelectedTagID(m.tag_id);setPaging((prevState) => ({ ...prevState, currentPage: 1 }))}}>
                  <div className={m.tag_id === selectedTagID? 'text-blue-300':null}>{m.tag}</div>
                </div>
              )})
            }
          </div>
        </div>
      </div>
    </div>
  )
}


