import dayjs from 'dayjs';
import {  useState } from 'react'
import Calendar from 'react-calendar'
import { useGetTasksQuery } from '../api/taskApi';

const Cal = ({ setDueDate}) => {
  const [value, onChange] = useState(new Date())

  const {data: tasks, isLoading , isSuccess,  isError, error } = useGetTasksQuery()

  //when clicking day in Cal
  const onClickDay = (value, event) => {
    setDueDate(new Date(value))
  }

  if(isLoading){
    return (<div>Loading...</div>)
  }
  if(isError){
    return(<div>Something went wrong!</div>)
  }



  //for formatting day 
  const tileContent = ({date,view})=>{
    var incomplete_tasks = []
    for(var i=0; i < tasks.length; i++){
    // console.log(new Date(date).toDateString(), new Date(v.duedate).toDateString())
      if(view === 'month' && date.toLocaleDateString() === new Date(tasks[i].duedate).toLocaleDateString()){
        incomplete_tasks = tasks.filter(f=>  date.toLocaleDateString() === new Date(f.duedate).toLocaleDateString() && f.completed === 0)
      }
      //console.log(incomplete_tasks)
    }
     //console.log(incomplete_tasks)
    return (incomplete_tasks.length > 0 ?<div className='flex flex-col rounded-sm text-xs text-left'>{incomplete_tasks.map(m=> <div key={m.task_id} className='bg-gray-500 p-0.5 pl-0.5 rounded-sm font-thin mb-0.5  wrap-anywhere text-gray-300 border-l-4 border-l-blue-600' title={m.note}>{m.task_title.length > 25 ? m.task_title.substr(0,25): m.task_title}</div>)}</div>: null)
  }
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-gray-400 rounded-lg p-1 w-full'>

      <Calendar minDate={new Date()}  onChange={onChange} value={value} className='rounded-md p-1 w-full! bg-gray-400! ' defaultView='month' tileContent={tileContent} calendarType='gregory'  showDoubleView={false} onClickDay={onClickDay} showNeighboringMonth={false} />
      
      <div className='hidden sm:hidden md:block lg:block'>
        <Calendar minDate={new Date()} defaultActiveStartDate={new Date(dayjs().add(1,'month'))}  onChange={onChange} value={value} className='rounded-md p-1 w-full! bg-gray-400!' defaultView='month' tileContent={tileContent} calendarType='gregory'  showDoubleView={false} onClickDay={onClickDay} showNeighboringMonth={false} />
      </div>
    </div>
  )
}

export default Cal