import { useState } from 'react'
import { Modal } from '../Utils/Modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../../reducers/taskSlice'


export default function AddTask({clearDataCallback, _duedate}) {
  // const [selectedTags, setSelectedTags] = useState([])
  const [task, setTask] = useState(null)
  const [startDate, setStartDate] = useState(_duedate)
  const [selectedOption, setSelectedOption] = useState(null)

  const dispatch = useDispatch()
  const tags = useSelector((state)=> state.tags.data)
  //console.log(_duedate)

  //form validation
  const [inp_task_val,setInpTaskVal ] = useState(undefined)
  const [sel_tag, setSelTag] = useState(undefined)
  const [inp_duedate, setInpDueDate] = useState(undefined)

  
  const onSubmit = async(e)=>{
    e.preventDefault()
    //console.log(e.target.tag, e.target.task.value, e.target.note.value, e.target.duedate.value)
    //console.log(e.target.tag.length, e.target.tag.value)
    if(e.target.task.value.length === 0 ){
      setInpTaskVal(false)
    }else{
      setInpTaskVal(true)
    }
    if(e.target.tag.length === undefined && e.target.tag.value === ''){
      setSelTag(false)
    }else{
      setSelTag(true)
    }
    if(e.target.duedate.length === undefined && e.target.duedate.value === ''){
      setInpDueDate(false)
    }else{
      setInpDueDate(true)
    }

    if(e.target.task.value.length === 0 || (e.target.tag.length === undefined  && e.target.tag.value === '')|| (e.target.duedate.length === undefined && e.target.duedate.value === '')){
      return
    }

    let _tags =[]
    if(e.target.tag.length !== undefined){
      for(var i = 0 ; i < e.target.tag.length; i++){
        _tags.push(e.target.tag[i].value)
      }
    }else{
      _tags = [e.target.tag.value]
    }

  dispatch(addTask({task_title: e.target.task.value,duedate: e.target.duedate.value, note: e.target.note.value, tags: _tags}))
  clearDataCallback()
  }


  const onChangeTask = (m)=>{
    setTask(m.target.value)
    setInpTaskVal(true)
    if(m.target.value.length === 0 ){
      setTask(null)
      setInpTaskVal(false)
    }
  }

  // const onSelectTag = (e) => {
  //   console.log(document.querySelector('#seltag').selected.value)
  //   setSelectedTags(prev=>[prev,e.target.value])
  // }

//console.log(selectedOption)
// console.log(tags)
  const _tags = tags.map(m=>({...m, value:m.tag_id, label: m.tag}))

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Add Task"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>

        <Select className='col-span-8' defaultValue={selectedOption} onChange={setSelectedOption} name='tag' options={_tags} isMulti={true} placeholder='Select one or more tags'  />
        {sel_tag === false ? <span className='text-sm text-red-500 col-span-8'>*Tag is required</span>:null}

        <input type='text' id='task' placeholder='Task'  className='bg-white rounded-md  col-span-8 p-2' onChange={(e)=>onChangeTask(e)} />
        {inp_task_val === false ? <span className='text-sm text-red-500 col-span-8'>*Task is required</span>:null}

        <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note'></textarea>

        <div className='col-span-8'>
          <div className='flex flex-row justify-center gap-2'>
            <div className='mt-1'>Due Date</div>
            <DatePicker selected={startDate} onChange={(date)=>{ setStartDate(date); setInpDueDate(true);}} minDate={new Date()} maxDate={dayjs().add(5,'year')} className=' bg-gray-100 p-1' id='duedate'/>
            {inp_duedate === false ? <span className='text-sm text-red-500 col-span-6'>*Date is required</span>:null}
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
