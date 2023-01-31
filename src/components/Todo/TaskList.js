import React, { useEffect, useState } from 'react'
import DeleteItem from '../Delete/DeleteItem'
import './TaskList.css';


function TaskList({ name, desc, id, edit, del, toggle }) {

    //State variables for Delete Pop up and whether to show info icon or edit/delete
    const [showDelete, setShowDelete] = useState(false);
    const [showInfo, setShowInfo] = useState(true);

    //If user cancelled the delete 
    const cancelDelete = () => {
        setShowDelete(false);
        setShowInfo(true);
    }

    //to change the edit/delete icons to info icon once user done with the update
    useEffect(() => {
        if (!toggle)
            setShowInfo(true);
    }, [toggle])

    return (


        <div className='items'>
            <div className="item-description">

                {/* if length is more than 10 or 25, then we can use three dots to show that more data is there  */}
                {name.length > 10 ? <h3 >{name.slice(0, 10)}...</h3> : <h3>{name}</h3>}
                {desc.length > 25 ? <p >{desc.slice(0, 25)}...</p> : <p>{desc}</p>}

            </div>
            <div className="item-actions">

                {/*  icons will be visible based on showInfo value */}
                {
                    showInfo
                        ? <i className="fa-solid fa-info info-icon info-icon" title='Info' onClick={() => setShowInfo(false)} />
                        : (<div className='edit-delete'>

                            {/* toggle condition is used to change the color of edit option when user clicked on it */}
                            <i className={toggle ? 'fa-sharp fa-solid fa-pen edit-icon edit-clicked' : 'fa-sharp fa-solid fa-pen edit-icon'} title='Edit' onClick={() => edit(id)} style={{ opacity: '0.7' }} />
                            <i className="fa-solid fa-xmark delete-icon" title='Delete' onClick={() => setShowDelete(true)} style={{ color: '#a35709' }} />

                        </div>)

                }



            </div>


            {/* if clicked on delete then this component will appear (Delete Pop Up)*/}
            {/* if user confirms for delete then del function run as received through props, otherwise cancelDelete will run */}
            {showDelete && <DeleteItem onDeleteConfirm={() => del(id)} onDeleteClose={cancelDelete} />}

        </div>

    )
}

export default TaskList
