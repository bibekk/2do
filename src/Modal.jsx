import { useState } from "react"
import { LuOctagonX } from "react-icons/lu"

export const Modal = ({title, children, clearDataCallback, style}) => {
  const [state, setState] = useState({renderClass: 'modal show', backdropClass:'modal-backdrop show'})

  const dismiss = ()=>{
    setState({renderClass :'modal fade', backdropClass:'modal-backdrop hide', data: null})
    clearDataCallback()
  }

  return (
    <div className="modal-backdrop backdrop-brightness-50 backdrop-blur-xs" >
      <div className="bg-gray-400 h-auto overflow-y-auto top-20 ml-auto mr-auto shadow-md p-1 rounded-md relative opacity-100 w-1/2" style={style} tabIndex="-1">
        <div className=" bg-gradient-to-r from-gray-500 to-white rounded-md p-1 text-gray-100 h-10 flex justify-between">
          <h3>{title}</h3>
          <button type='button' className=" border-none bg-none text-2xl text-red-300 hover:text-red-500 hover:cursor-pointer" data-dismiss="modal" onClick={()=>dismiss()}><LuOctagonX /></button>
        </div>

        <div className="modal-body p-1">
          {children}
        </div>

      </div>
    </div>
  )
}
