import { useState } from "react"
import { LuOctagonX } from "react-icons/lu"

export const Modal = ({title, children, clearDataCallback, style, width}) => {
  const [state, setState] = useState({renderClass: 'modal show', backdropClass:'modal-backdrop show'})

  const dismiss = ()=>{
    setState({renderClass :'modal fade', backdropClass:'modal-backdrop hide', data: null})
    clearDataCallback()
  }

 // console.log(width)
  return (
    <div className="modal-backdrop backdrop-brightness-50 backdrop-blur-xs" >
      <div className={`bg-gray-400 h-auto overflow-y-auto top-20 ml-auto mr-auto shadow-md p-1 rounded-md relative opacity-100 w-[90%] ${width !== undefined ?' w-[97%]':null}`} style={style} tabIndex="-1">
        <div className=" bg-slate-500 text-black rounded-md p-1 font-bold h-10 flex justify-between">
          <h3>{title}</h3>
          <button type='button' className=" border-none bg-none text-2xl text-red-500 hover:text-red-300 hover:cursor-pointer" data-dismiss="modal" onClick={()=>dismiss()}><LuOctagonX /></button>
        </div>

        <div className="modal-body p-1">
          {children}
        </div>

      </div>
    </div>
  )
}
//w-auto text-sm font-bold border-r-1 border-b-1 rounded-md bg-slate-200 mb-1 p-0.5