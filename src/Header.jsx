import { BiTask } from "react-icons/bi"
import { MdAddCircle } from "react-icons/md"

export const Header = ({showAddTask}) => {
  return (
    <div className='flex gap-2 justify-between bg-black'>
      <h2 className='text-gray-300 text-3xl p-2 py-3'><BiTask className='float-left mr-2 text-gray-300 text-3xl mt-1'/>2Do</h2>
      <button onClick={showAddTask}><MdAddCircle className='text-2xl text-gray-200 hover:text-gray-700 hover:cursor-pointer mr-4' title='New task' /></button>
    </div>
  )
}
