import {  useState } from 'react'
import Calendar from 'react-calendar'
import {  useSelector } from 'react-redux';

const Cal = ({ setDueDate}) => {
  const [value, onChange] = useState(new Date())
  const tasks = useSelector((state)=> state.taskstags.tasks)

  //when clicking day in Cal
  const onClickDay = (value, event) => {
    setDueDate(new Date(value))
  }

  //for formatting day 
  const tileContent = ({date,view})=>{
    var incomplete_tasks = []
    for(var i=0; i < tasks.length; i++){
      //console.log(new Date(v.duedate).toLocaleDateString(), new Date(date).toLocaleDateString())
      //console.log(view)
      //console.log(v.duedate)
    // console.log(new Date(date).toDateString(), new Date(v.duedate).toDateString())
      if(view === 'month' && date.toLocaleDateString() === new Date(tasks[i].duedate).toLocaleDateString()){
        incomplete_tasks = tasks.filter(f=>  date.toLocaleDateString() === new Date(f.duedate).toLocaleDateString() && f.completed === 0)
        
        // if(incomplete_tasks.length > 0 ){
        //   let title = incomplete_tasks.map((m,j)=>`\n${j+1}. ${m.task_title}\n`)
        //   //c.push(title)
        //   //title = title.join('')
        //   // return(
        //   //   <div className=' bg-gray-300 rounded-md font-thin text-blue-700 text-xs  border-gray-500 border-1 shadow-md hover:bg-gray-500 hover:text-white'>
        //   //     <div className='grid grid-cols-1'>
        //   //     <div title={title}>{title}</div>
        //   //     </div>
        //   //   </div>
        //   //   )
        // }
      }
      //console.log(incomplete_tasks)
    }
     //console.log(incomplete_tasks)
    return (incomplete_tasks.length > 0 ?<div className='flex flex-col rounded-sm text-xs text-left'>{incomplete_tasks.map(m=> <div key={m.task_id} className='bg-gray-500 m-0.5 p-0.5 pl-1 rounded-sm font-thin  wrap-anywhere text-gray-300 border-l-4 border-l-blue-600' title={m.note}>{m.task_title}</div>)}</div>: null)
  }
  
  return (
    <Calendar minDate={new Date()}  onChange={onChange} value={value} className='rounded-md p-1 w-full bg-gray-400!' defaultView='month' tileContent={tileContent} calendarType='gregory'  showDoubleView={false} onClickDay={onClickDay} showNeighboringMonth={false} />
  )
}

export default Cal