
//import dayjs from "dayjs"

import { useSelector } from "react-redux"

const Stat = () => {
  const tasks = useSelector((state) => state.taskstags.tasks)
  const perc_complete =(tasks.filter(f=> f.completed === 1).length/tasks.length * 100).toFixed(2)

  //console.log(tasks.filter(f=> f.completed === 0 && dayjs().isAfter(f.duedate)))
  //console.log(tasks)
  return (
    <div className='flex flex-col grow  p-1 bg-gray-400 rounded-lg'>
      <div className='task-heading'>Summary ({(tasks.filter(f=> f.completed === 1).length/tasks.length*100).toFixed(2)}%)</div>
      <div className='flex flex-col gap-1 p-0.5 text-sm mx-8 text-gray-100'>
        <div className='flex gap-2 justify-center'><span>Total</span><span>{tasks.length}</span></div>
        <div className='flex gap-2 justify-center'><span>Completed</span><span>{tasks.filter(f=> f.completed === 1).length}</span></div>
        <div className='flex gap-2 justify-center'><span>Past Due</span><span>{tasks.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString())).length}</span></div>
        <div className='flex gap-2 justify-center'><span>Remaining</span><span>{tasks.filter(f=> f.completed === 0).length}</span></div>
        <div className='w-full bg-white border-2 border-gray-500'>
          <div className='bg-green-400  h-3 text-gray-500' style={{width: `${perc_complete}%`}}>.</div>
        </div>
      </div>
    </div>
  )
}

export default Stat