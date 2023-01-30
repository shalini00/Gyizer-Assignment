import React from 'react'
import './DeleteItem.css'
import Modal from '../modal/Modal';

function DeleteItem(props) {
    return (
        // Enclosed in Modal component
        <Modal onCloseModal={props.onDeleteClose}>
            <div className='del-container'>
                <div className="del-content">
                    <div className="question">
                        <p>Delete this task?</p>
                    </div>
                    <div className="buttons">
                       
                        <button className="Delete-button" onClick={props.onDeleteConfirm}>
                            Yes
                        </button>
                        <button className="Cancel-button" onClick={props.onDeleteClose}>No</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteItem
