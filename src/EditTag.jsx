import { Modal } from './Modal';
import { base_url } from './Util';
import toast from 'react-hot-toast';

const EditTag = ({clearDataCallback, refreshData, tag}) => {

  const onSubmit = async (e)=>{
    e.preventDefault()
    try {
      const resp = await fetch(`${base_url()}/tag/updatetag?tag_id=${tag.tag_id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tag: e.target.tag.value, note: e.target.note.value})
      })

      const resp_data = await resp.json()
      //console.log(resp_data)
      clearDataCallback()
      refreshData()
      toast.success("Tag Updated!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})

    }catch(err) {
      console.log(err)
    }
  }

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Edit Tag"}>
      <form onSubmit={onSubmit} className='mt-2 grid grid-cols-8 gap-4'>
          <input type='text' id='tag' placeholder='Tag'  className='bg-white rounded-md  col-span-8 p-2'  defaultValue={tag.tag} />

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