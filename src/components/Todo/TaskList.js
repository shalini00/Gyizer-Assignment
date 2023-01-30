import React, { useState } from 'react'
import DeleteItem from '../Delete/DeleteItem'
import './TaskList.css';


function TaskList({ name, desc, id, edit, del }) {

    //State variables for Delete Pop up and whether to show info icon or edit/delete
    const [showDelete, setShowDelete] = useState(false);
    const [showInfo, setShowInfo] = useState(true);

    return (
      
       
        <div className='items'>
            <div className="item-description">

                {/* if length is more than 10 or 25, then we can use three dots to show that more data is there  */}
                {name.length > 10 ? <h3 >{name.slice(0,10)}...</h3> : <h3>{name}</h3>}
                {desc.length > 25 ? <p >{desc.slice(0,25)}...</p> : <p>{desc}</p>}

            </div>
            <div className="item-actions">

                {/*  icons will be visible based on showInfo value */}
                {
                    showInfo
                        ? <i className="fa-solid fa-info info-icon info-icon" title='Info' onClick={() => setShowInfo(false)} />
                        : (<div className='edit-delete'>
                            <i className="fa-sharp fa-solid fa-pen edit-icon" title='Edit' onClick={() => edit(id) } style={{opacity: '0.7'}}/>
                            <i className="fa-solid fa-xmark delete-icon" title='Delete' onClick={() => setShowDelete(true)} style={{color: '#a35709'}}/>
                        </div>)

                }



            </div>


            {/* if clicked on delete then this component will appear (Delete Pop Up) */}
            {showDelete && <DeleteItem onDeleteConfirm={() => del(id)} onDeleteClose={() => setShowDelete(false)} />}

        </div>
      
    )
}

export default TaskList
