import { useState } from 'react'
import { Modal } from './Modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { base_url } from './Util'


export default function AddTask({clearDataCallback, tags, reload}) {
    const [selectedTags, setSelectedTags] = useState([])
    const [task, setTask] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [selectedOption, setSelectedOption] = useState(null)


  const onSubmit = async(e)=>{
    e.preventDefault()
    //console.log(e.target.tag, e.target.task.value, e.target.note.value, e.target.duedate.value)
    let _tags =[]
    if(e.target.tag.length !== undefined){
      for(var i = 0 ; i < e.target.tag.length; i++){
        _tags.push(e.target.tag[i].value)
      }
    }else{
      _tags = [e.target.tag.value]
    }

  //  // console.log(e.target.tag.length, e.target.tag.value)
  //   console.log(_tags)
  //   return 

    try {
      const resp = await fetch(`${base_url()}/task/addtask`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task_title: e.target.task.value, duedate: e.target.duedate.value, note: e.target.note.value, tags: _tags})
      })

      const resp_data = await resp.json()
      console.log(resp_data)
      clearDataCallback()
      toast.success("Task Added!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
      reload()

    }catch(err) {
      console.log(err)
    }
  }

  const onChangeTags = (m)=>{
    setTags(m.target.value)
    if(m.target.value.length === 0 ){
      setTags(null)
    }
  }

  const onChangeTask = (m)=>{
    setTask(m.target.value)
    if(m.target.value.length === 0 ){
      setTask(null)
    }
  }

  const onSelectTag = (e) => {
    console.log(document.querySelector('#seltag').selected.value)
    setSelectedTags(prev=>[prev,e.target.value])
  }

  //console.log(selectedOption)
 // console.log(tags)
  const _tags = tags.map(m=>({...m, value:m.tag_id, label: m.tag}))

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Add Task"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>
          <div className='p-1 bg-gray-300 font-thin text-sm border-l-4 border-l-green-500 ml-2 mb-2 col-span-8 '>Select one or more tags from below:</div>


          <Select className='col-span-8' defaultValue={selectedOption} onChange={setSelectedOption} options={_tags} isMulti={true} placeholder='Select one or more tags' name='tag' />
          
          {/* { tags !== null && <button className='col-span-1. bg-neutral-500 hover:bg-neutral-700 hover:text-gray-300 rounded-md' onClick={(e)=>{e.preventDefault();document.getElementById('tag').value = ''; setTags(null);}}>Clear</button>} */}

          <input type='text' id='task' placeholder='Task'  className='bg-white rounded-md  col-span-8 p-2' onChange={(e)=>onChangeTask(e)} />
          
          {/* <button className='col-span-1. bg-neutral-500 hover:bg-neutral-700 hover:text-gray-300 rounded-md'  onClick={(e)=>{e.preventDefault();document.getElementById('task').value = ''; setTask(null);}}>Clear</button> */}

          <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note'></textarea>

          <div className='col-span-8'>
            <div className='flex flex-row justify-center gap-2'>
              <div className='mt-1'>Due Date</div>
              <DatePicker selected={startDate} onChange={(date)=> setStartDate(date)} minDate={new Date()} maxDate={dayjs().add(1,'year')} className=' bg-gray-100 p-1' id='duedate'/>
            </div>
          </div>

          <div className='col-span-8'>
            <div className='flex flex-row justify-center content-start'>
              <button className=' bg-red-100 hover:bg-red-400 hover:text-gray-300 rounded-md p-2'  onClick={clearDataCallback}>Cancel</button> 
              <button className='bg-gray-300 p-2 ml-2 rounded-md hover:bg-gray-500 hover:text-gray-300'>Add</button>
              </div>
          </div>
      </form>
    </Modal>
  )
}
