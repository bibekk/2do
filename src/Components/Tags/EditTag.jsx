// import { useDispatch } from 'react-redux';
import { Modal } from '../Utils/Modal';
// import {  updateTag } from '../../reducers/tagSlice';
import { useState } from 'react';
import { useUpdateTagMutation } from '../../api/tagApi';
import toast from 'react-hot-toast';

const EditTag = ({clearDataCallback, tag}) => {
  // const dispatch = useDispatch()
  const [updateTag] = useUpdateTagMutation()
  //form validation
  const [inp_tag, setInpTag] = useState(undefined)

  const onSubmit = async (e)=>{
    e.preventDefault()
    //form validation
    if(e.target.tag.length === undefined && e.target.tag.value === ''){
      setInpTag(false)
    }else{
      setInpTag(true)
    }
    if(e.target.tag.length === undefined && e.target.tag.value === ''){
      return
    }
    //form validation
    const output = await updateTag({tag_id: tag.tag_id, tag: e.target.tag.value, note: e.target.note.value}).unwrap()
    if(output === true){
      toast.success("Tag Updated!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
    }
    clearDataCallback()
  }

  const onChangeTag = (m)=>{
    if((m.target.value.length === undefined || m.target.value.lengh === 0) || m.target.value === ''){
      setInpTag(false)
    }else{
      setInpTag(true)
    }
    //setTag(m.target.value)
  }

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Edit Tag"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>
          <input type='text' id='tag' placeholder='Tag'  className='bg-white rounded-md  col-span-8 p-2'  defaultValue={tag.tag} onChange={(e)=>onChangeTag(e)} />
          {inp_tag === false ? <span className='text-sm text-red-500 col-span-8'>*Tag is required</span>:null}

          <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note' defaultValue={tag.note}></textarea>

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

export default EditTag