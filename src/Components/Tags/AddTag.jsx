import { useState } from 'react'
import { Modal } from '../Utils/Modal'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { useAddTagMutation } from '../../api/tagApi'
import toast from 'react-hot-toast'
//import { addTag } from '../../reducers/tagSlice'

export default function AddTag({clearDataCallback}) {
  const [tag, setTag] = useState(null)
  const dispatch = useDispatch()

  //form validation
  const [inp_tag, setInpTag] = useState(undefined)

  //rtk
  const [addTag] = useAddTagMutation()

  const onSubmit = async(e)=>{
    e.preventDefault()
    if(e.target.tag.length === undefined && e.target.tag.value === ''){
      setInpTag(false)
    }else{
      setInpTag(true)
    }
    if(e.target.tag.length === undefined && e.target.tag.value === ''){
      return
    }
    //dispatch(addTag({tag: e.target.tag.value, note: e.target.note.value}))
    await addTag({tag: e.target.tag.value, note: e.target.note.value}).unwrap()
    toast.success("New Tag Added!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
    clearDataCallback()
  }

  const onChangeTag = (m)=>{
    if((m.target.value.length === undefined || m.target.value.lengh === 0) || m.target.value === ''){
      setInpTag(false)
    }else{
      setInpTag(true)
    }
    setTag(m.target.value)
  }


  return (
    <Modal clearDataCallback={clearDataCallback} title={"Add Tag"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>
          <input type='text' id='tag' placeholder='Tag'  className='bg-white rounded-md  col-span-8 p-2' onChange={(e)=>onChangeTag(e)} />
          {inp_tag === false ? <span className='text-sm text-red-500 col-span-8'>*Tag is required</span>:null}
          {/* <button className='col-span-1. bg-neutral-500 hover:bg-neutral-700 hover:text-gray-300 rounded-md'  onClick={(e)=>{e.preventDefault();document.getElementById('task').value = ''; setTask(null);}}>Clear</button> */}

          <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note'></textarea>

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
