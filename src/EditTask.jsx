import DatePicker from 'react-datepicker';
import { Modal } from './Modal';
import { base_url } from './Util';
import toast from 'react-hot-toast';
import Select from 'react-select';
import {  useState } from 'react';
import dayjs from 'dayjs';

const EditTask = ({clearDataCallback, task, tags, taskstags, reload}) => {
  const [selectedOption, setSelectedOption] = useState(taskstags.filter(f=> f.task_id === task.task_id).map(m=>({...m, value:m.tag_id, label: m.tag})))
  const [startDate, setStartDate] = useState(task.duedate)

//console.log(taskstags)
  const onSubmit = async (e)=> { //console.log(e.target.task_complete.checked)
    e.preventDefault()
    let _tags =[]
    if(e.target.tag.length !== undefined){
      for(var i = 0 ; i < e.target.tag.length; i++){
        _tags.push(e.target.tag[i].value)
      }
    }else{
      _tags = [e.target.tag.value]
    }

    //console.log(e.target.tag, e.target.task.value, e.target.note.value, e.target.duedate.value)
    try {
      const resp = await fetch(`${base_url()}/task/updateTaskDetail?task_id=${task.task_id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task_title:e.target.task.value, note: e.target.note.value, duedate: e.target.duedate.value, tags: _tags, completed: e.target.task_complete.checked?1:0})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      clearDataCallback()
      reload()
      toast.success("Task Updated!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})

    }catch(err) {
      console.log(err)
    }
  }

  const _tags = tags.map(m=>({...m, value:m.tag_id, label: m.tag}))

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Edit Task"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>

        <div className='p-1 bg-gray-300 font-thin text-sm border-l-4 border-l-green-500 ml-2 mb-2 col-span-8 '>Select one or more tags from below:</div>

        <Select className='col-span-8' defaultValue={selectedOption} onChange={setSelectedOption} options={_tags} isMulti={true} placeholder='Select one or more tags' name='tag' />

        <input type='text' id='task' placeholder='Task'  className='bg-white rounded-md  col-span-8 p-2' defaultValue={task.task_title}  />
          
        <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note' defaultValue={task.note}></textarea>

        <div className='col-span-8'>
          <div className='flex flex-row justify-center gap-2'>
            <div className='mt-1'>Due Date</div>
            <DatePicker selected={startDate} onChange={(date)=> setStartDate(date)} minDate={new Date()} maxDate={dayjs().add(1,'year')}  className=' bg-gray-100 p-1' id='duedate'/>
            <input type='checkbox' id='task_complete' value='1' className='h-6 w-6 mt-1.5'  defaultChecked={task.completed?'checked':null} />
            <label htmlFor='task_complete' className='p-1 mt-1 text-sm'>Complete</label>
          </div>
        </div>

        <div className='col-span-8'>
          <div className='flex flex-row justify-center content-start'>
            <button className=' bg-red-100 hover:bg-red-400 hover:text-gray-300 rounded-md p-2'  onClick={clearDataCallback}>Cancel</button> 
            <button className='bg-gray-300 p-2 ml-2 rounded-md hover:bg-gray-500 hover:text-gray-300'>Update</button>
          </div>
        </div>

      </form>
    </Modal>
  )
}

export default EditTask