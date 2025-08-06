import { useEffect, useState } from "react"
import { MdAddCircle, MdDelete } from "react-icons/md"
import { base_url } from "./Util"
import AddTag from "./AddTag"
import { FaEdit } from "react-icons/fa"
import toast from "react-hot-toast"
import EditTag from "./EditTag"
//import _ from 'lodash'


const TagManager = ({reload, taskstags, setShowTag, showTag}) => {
  const [tags, setTags] = useState([])
  const [refreshdata, setRefreshData] = useState(true)
  const [showAddTag, setShowAddTag] = useState(false)
  const [showEditTag, setShowEditTag] = useState({show:false, tag: null})
  //const [showTag, setShowTag] =useState(false)


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

  return (
    <>
      <div className='w-full  bg-gradient-to-r from-gray-500 to-white rounded-md p-1 text-gray-100'>Tags
        <MdAddCircle className='text-2xl float-right text-gray-500 hover:text-gray-800 hover:cursor-pointer' title='New Tag' onClick={()=> setShowAddTag(true)} />
      </div>

      <div className="flex w-full">
          <input type='checkbox' id='show_tag' value='Show Tag' className='h-4 w-4 mt-1.5' onClick={()=>setShowTag(!showTag)}/>
          <label htmlFor='show_tag' className='p-1 text-sm mr-2'>{showTag?'Hide Tags':'Show Tags'}</label>
      </div>

      <div className='tag tagall -mt-1'>All</div>
      {tags.map((m,i) => {
          return(
          <div className='tag flex -mt-1' key={i}>{m.tag}
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
    </>
  )
}

export default TagManager