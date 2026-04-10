import {useEffect, useState} from 'react';

function Paging(props) {
  const [ state, setState] = useState({ 
    currentPage: props.currentPage,
      itemsPerPage: props.itemsPerPage,
      total: props.total, 
      pages: [], 
    //  pagesToShow: 10
    })

  useEffect(()=>{ //console.log(props) 
    setState({ 
      currentPage: props.currentPage,
      itemsPerPage: props.itemsPerPage,
      total: props.total,
      pages: [],
     // pagesToShow: 10 
    })
  },[props, props.total])

  var pages = [], pagesdropdown = []; var total = state.total; 
  var noOfPages = Math.ceil(total / state.itemsPerPage); //console.log('noOfPages',noOfPages)

  const nextPage =()=> {
    setState(prevState => ({ ...prevState, currentPage : Number(state.currentPage) + 1 }))
    props.nextHandler(); 
  }

  const prevPage =()=>{ 
    setState(prevState => ({ ...prevState, currentPage : Number(state.currentPage) -1 }))
    props.prevHandler(); 
  }

  const goToPageHandler =(id)=> { //console.log(event.target.getAttribute('id')) 
    setState(prevState => ({ ...prevState, currentPage : Number(id) }))
    props.goToPageHandler(Number(id)); 
  }

  const goToPageHandlerDropDown =(e)=> { 
    let selectedPage = document.querySelector('#pageSelect').value
    if (selectedPage !== 'Jump To') { 
      setState(prevState => ({ ...prevState, currentPage : Number(selectedPage) })) 
      props.goToPageHandler(Number(selectedPage)); 
    } 
  }
   //for pages mapping first step 
  if (noOfPages > 10) { 
    for (var j = 1; j <= 5; j++) { 
      pages.push(j); 
    }
    pages.push('#');
    for (var k = 5; k <= noOfPages - 5; k++) { 
      if (k === 5) { 
        pagesdropdown.push('Jump To'); 
      } else { 
        pagesdropdown.push(k); 
      } 
    }
    for (var i = noOfPages - 4; i <= noOfPages; i++) { 
      pages.push(i); 
    }
  } else { 
      for (var z = 1; z <= noOfPages; z++) {
        pages.push(z); 
      } 
    }
 //console.log(pages)
  const RenderPageDropDown = pagesdropdown.map(x => {
    return (<option key={x} >{x}</option>); 
  });

 //for rendering pages # for the dropdown place 
  const RenderPages = pages.map(number => { 
    var temp; 
    if (state.currentPage === number && number !== '#') { 
      temp = <li key={number} className="page-item active" ><a className="page-link" id={number} onClick={goToPageHandler} href='#/'>{number}</a></li>; 
    } else if (state.currentPage !== number && number !== '#') {
      temp = <li key={number} className="page-item" ><a className="page-link" id={number} onClick={()=>goToPageHandler(number)} href='#/'>{number}</a></li>; 
    } else {
        temp = <li key={number} className="page-item" ><span className="page-link"><select id="pageSelect" onChange={goToPageHandlerDropDown} value={state.currentPage}>{RenderPageDropDown}</select></span></li>;
      } 
      return temp 
    });

 //console.log(RenderPages)
  var deactivePrevLinkClass = "page-item", deactiveNextLinkClass = "page-item"; 
  state.currentPage === 1 ? deactivePrevLinkClass = "page-item disabled" : deactiveNextLinkClass = "page-item" 
  state.currentPage === noOfPages ? deactiveNextLinkClass = "page-item disabled" : deactiveNextLinkClass = "page-item"

 //do not show pages if total items less than items need to show in page 
  if (state.itemsPerPage < total) {
    return ( 
    <ul className="pagination flex"> 
      <li className={deactivePrevLinkClass}> 
        <a className="page-link" tabIndex="-1" onClick={prevPage} aria-label="Previous" href='#/'> 
          <span aria-hidden="true">&laquo;</span> 
          <span className="sr-only">Previous</span> 
        </a> 
      </li>
      {RenderPages} 
      <li className={deactiveNextLinkClass}> 
        <a className="page-link" onClick={nextPage} aria-label="Next" href='#/'> 
          <span aria-hidden="true">&raquo;</span> 
          <span className="sr-only">Next</span> 
        </a> 
      </li> 
    </ul> 
    ); 
  } else { 
    return ( <div></div> ); 
  }
}
export default Paging;