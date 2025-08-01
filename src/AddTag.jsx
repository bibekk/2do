import { useState } from 'react'
import { Modal } from './Modal'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { base_url } from './Util'


export default function AddTag({clearDataCallback, refreshData}) {
  const [tag, setTag] = useState(null)

  const onSubmit = async(e)=>{
    e.preventDefault()
    //console.log(e.target.tag.value,  e.target.note.value)
    

    try {
      const resp = await fetch(`${base_url()}/tag/addtag`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tag: e.target.tag.value, note: e.target.note.value})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      clearDataCallback()
      refreshData()
      toast.success("Tag Added!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})

    }catch(err) {
      console.log(err)
    }
  }

  const onChangeTag = (m)=>{
    setTag(m.target.value)
  }

  //console.log(selectedOption)
 // console.log(tags)
  //const _tags = tags.map(m=>({...m, value:m.tag_id, label: m.tag}))

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Add Tag"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>
          <input type='text' id='tag' placeholder='Tag'  className='bg-white rounded-md  col-span-8 p-2' onChange={(e)=>onChangeTag(e)} />
          
          {/* <button className='col-span-1. bg-neutral-500 hover:bg-neutral-700 hover:text-gray-300 rounded-md'  onClick={(e)=>{e.preventDefault();document.getElementById('task').value = ''; setTask(null);}}>Clear</button> */}

          <textarea id='note' className='col-span-8 bg-gray-100 p-1' placeholder='Note'></textarea>

          <div className='col-span-8'>
            <div className='flex flex-row justify-center content-start'>
              <button className=' bg-neutral-500 hover:bg-neutral-700 hover:text-gray-300 rounded-md p-2'  onClick={(e)=>{e.preventDefault();document.getElementById('task').value = '';}}>Clear</button> 
              <button className='bg-gray-300 p-2 ml-2 rounded-md hover:bg-gray-500 hover:text-gray-300'>Add</button>
              </div>
          </div>
      </form>
    </Modal>
  )
}
