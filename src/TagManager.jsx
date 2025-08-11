import { useEffect, useState } from "react"
import { MdAddCircle, MdDelete } from "react-icons/md"
import { base_url } from "./Util"
import AddTag from "./AddTag"
import { FaEdit } from "react-icons/fa"
import toast from "react-hot-toast"
import EditTag from "./EditTag"
import { Modal } from "./Modal"
//import _ from 'lodash'


const TagManager = ({reload, taskstags, setShowTag, showTag, clearDataCallback}) => {
  const [tags, setTags] = useState([])
  const [refreshdata, setRefreshData] = useState(true)
  const [showAddTag, setShowAddTag] = useState(false)
  const [showEditTag, setShowEditTag] = useState({show:false, tag: null})
  //const [showTag, setShowTag] =useState(false)
  // const [selectedTags, setSelectedTags] = useState([])

  const getTags = async ()=>{
    try {
      const resp = await fetch(`${base_url()}/tag/gettags`)
      const resp_data = await resp.json()
      setTags(resp_data)
    }catch(err) {
      console.log(err)
    }    
  }

  const deleteTag = async (tid) => {
    try {
      const resp = await fetch(`${base_url()}/tag/deletetag?tag_id=${tid}`,{
        method: 'DELETE'
      })
      const resp_data = await resp.json()
      if(resp_data === true){
        toast.success("Tag removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
        setRefreshData(!refreshdata)
      }else{
        toast.error(resp_data,{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
      }
    }catch(err) {
      console.log(err)
      toast.error("Unexpected Error!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
    }   
  }

  useEffect(()=> {
    getTags()
  },[refreshdata])
  
  //const taggrp= _.groupBy(taskstags,'tag_id')

  //console.log(selectedTags)
  return (
    <Modal clearDataCallback={clearDataCallback} title={"Tags"} width={50} >
      <div className='bg-gray-400 rounded-lg p-1 w-full flex gap-2 flex-wrap'>

      <div className="flex  gap-1 w-full mb-2">
        <button className="flex  gap-1 bg-gray-300 rounded-md p-1  hover:text-gray-200 hover:cursor-pointer hover:bg-gray-500" onClick={()=> setShowAddTag(true)}>
          Add New
        </button>
      </div>

      <div className='tag tagall -mt-1'>All</div>
      {tags.map((m,i) => {
          return(
          <div className='tag flex -mt-1' key={i}>
            {/* <input type='checkbox' id={`tag_${m.tag_id}`} value='Show Tag' className='h-4 w-4 mt-1.5' onClick={()=>{selectedTags.filter(f=> f === m.tag_id).length === 0? setSelectedTags(prevState=> [...prevState, m.tag_id]):setSelectedTags(selectedTags.filter(f=>f!== m.tag_id))}}/>
            <label htmlFor={`tag_${m.tag_id}`} className='p-1 text-sm mr-2'>{m.tag}</label> */}

            {m.tag}
          ({taskstags.filter(f=> f.tag_id === m.tag_id).length})
            <div className="flex gap-1 mt-1  ml-2">
              <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer text-xs' onClick={()=>setShowEditTag({show: true, tag: m})} />
              <MdDelete className='text-red-400 text-sm hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {deleteTag(m.tag_id)}}}/>
            </div>
          </div>)
      })}
      
      {showAddTag && 
        <AddTag clearDataCallback={()=> setShowAddTag(false)} refreshData={()=>{setRefreshData(!refreshdata); reload()}} />
      }

      {showEditTag.show && 
        <EditTag clearDataCallback={()=> setShowEditTag({show: false, tag: null})} refreshData={()=>{setRefreshData(!refreshdata); reload()}} tag={showEditTag.tag} />
      }
      </div>
    </Modal>
  )
}

export default TagManager