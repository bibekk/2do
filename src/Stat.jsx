
//import dayjs from "dayjs"

const Stat = ({tasks}) => {
  const perc_complete =(tasks.filter(f=> f.completed === 1).length/tasks.length * 100).toFixed(2)

  //console.log(tasks.filter(f=> f.completed === 0 && dayjs().isAfter(f.duedate)))
  //console.log(tasks)
  return (
    <div className='flex flex-col'>
      <div className='w-full bg-gradient-to-r from-gray-500 to-white rounded-md p-1 text-gray-100'>Summary</div>
      <div className='flex flex-col gap-1 p-0.5 text-sm mx-8 text-gray-100'>
        <div className='flex gap-2 justify-between'><span>Total</span><span>{tasks.length}</span></div>
        <div className='flex gap-2 justify-between'><span>Completed</span><span>{tasks.filter(f=> f.completed === 1).length}</span></div>
        <div className='flex gap-2 justify-between'><span>Past Due</span><span>{tasks.filter(f=> f.completed === 0 && new Date(f.duedate) < new Date(new Date().toLocaleDateString())).length}</span></div>
        <div className='flex gap-2 justify-between'><span>Remaining</span><span>{tasks.filter(f=> f.completed === 0).length}</span></div>
        <div className='w-full bg-white border-2 border-gray-500'>
          <div className='bg-green-400  h-3 text-gray-500' style={{width: `${perc_complete}%`}}>.</div>
        </div>
      </div>
    </div>
  )
}

export default Stat