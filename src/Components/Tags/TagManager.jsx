import {  useState } from "react"
import { MdDelete } from "react-icons/md"
import AddTag from "./AddTag"
import { FaEdit } from "react-icons/fa"
import EditTag from "./EditTag"
import { Modal } from "../Utils/Modal"
// import { useDispatch, useSelector } from "react-redux"
// import { getTags , deleteTag } from "../../reducers/tagSlice"
import { useDeleteTagMutation, useGetTagsQuery } from "../../api/tagApi"
import { useGetTasksTagsQuery } from "../../api/taskApi"
import toast from "react-hot-toast"

const TagManager = ({ clearDataCallback}) => {
  const [showAddTag, setShowAddTag] = useState(false)
  const [showEditTag, setShowEditTag] = useState({show:false, tag: null})

  //redux
  // const dispatch = useDispatch()
  //const tags = useSelector((state) => state.tags.data)
  //const taskstags = useSelector((state) => state.taskstags.data)
  //const refreshdata = useSelector((state)=> state.tags.refreshdata)

  //rtk query
  const {data: tags, isLoading, isSuccess, isError} = useGetTagsQuery()
  const {data: taskstags, isLoading: isLoadingTasksTags} = useGetTasksTagsQuery()
  const [deleteTag] = useDeleteTagMutation()
  const { refetch } = useGetTagsQuery()

  const handleDeleteTag = async(id) =>{
    try{
      const output = await deleteTag(id).unwrap()
      
      //console.log(isLoadingDelete)
      if(output === true){
        toast.success("Tag removed!",{position: "top-center", duration: 1000, style: {background: '#333', color: '#fff'}})
      }else{
        toast.error(output)
      }
      
    }catch{
      console.log('Error')
      toast.error("Error deleting!")
    }
  }
  // useEffect(()=> {
  //   dispatch(getTags())
  // },[refreshdata])
  //console.log(isLoading, isLoadingTasksTags)
  if(isLoading || isLoadingTasksTags){
    return (<div>Loading...</div>)
  }
  if(isError){
    return(<div>Something went wrong!</div>)
  }

  return (
    <Modal clearDataCallback={clearDataCallback} title={"Tags"} width={50} >
      <div className='bg-gray-400 rounded-lg p-1 w-full flex gap-2 flex-wrap'>

      <div className="flex  gap-1 w-full mb-2">
        <button className="flex  gap-1 bg-gray-300 rounded-md p-1  hover:text-gray-200 hover:cursor-pointer hover:bg-gray-500" onClick={()=> setShowAddTag(true)}>
          Add New
        </button>
      </div>

      {/* <div className='tag tagall -mt-1'>All</div> */}
      {tags.map((m,i) => {
        return(
        <div className='tag flex -mt-1' key={i}>
          {/* <input type='checkbox' id={`tag_${m.tag_id}`} value='Show Tag' className='h-4 w-4 mt-1.5' onClick={()=>{selectedTags.filter(f=> f === m.tag_id).length === 0? setSelectedTags(prevState=> [...prevState, m.tag_id]):setSelectedTags(selectedTags.filter(f=>f!== m.tag_id))}}/>
          <label htmlFor={`tag_${m.tag_id}`} className='p-1 text-sm mr-2'>{m.tag}</label> */}
          {m.tag} {m.note.length > 0 &&<span className="text-xs mt-0.5 m-1 bg-slate-100 p-0.5 rounded-md">{m.note}</span>}
          ({taskstags.filter(f=> f.tag_id === m.tag_id).length})
          <div className="flex gap-1 mt-1  ml-2">
            <FaEdit className='text-gray-600 hover:text-gray-900 hover:cursor-pointer text-xs' onClick={()=>setShowEditTag({show: true, tag: m})} />
            <MdDelete className='text-red-400 text-sm hover:text-red-700 hover:cursor-pointer' onClick={()=>{if(window.confirm('Are you sure you want to delete?')) {handleDeleteTag(m.tag_id)}}}/>
          </div>
        </div>)
      })}
      
      {showAddTag && 
        <AddTag clearDataCallback={()=> setShowAddTag(false)} />
      }

      {showEditTag.show && 
        <EditTag clearDataCallback={()=> {setShowEditTag({show: false, tag: null}); refetch()}} tag={showEditTag.tag} />
      }
      </div>
    </Modal>
  )
}

export default TagManager