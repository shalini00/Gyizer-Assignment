import React, { useEffect, useState } from 'react'
import TaskList from './TaskList';
import './Todo.css'

//To get the items from local storage so that data will persist even after refresh
const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}



function Todo() {

    //State variables 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggle, setToggle] = useState(false);
    const [isEditItem, setIsEditItem] = useState(null);



    // To add item --- if toggle is false then new item is being added  and if true then it's for update
    const addItems = () => {

        if (!title || !description) {
            alert("Please add the title and description both!")
        } else if (title && toggle) {

            setItems(
                items.map(element => {
                    if (element.id === isEditItem) {
                        return { ...element, name: title, desc: description }
                    }

                    return element;
                })
            )

            setTitle('');
            setDescription('');
            setIsEditItem(null);
            setToggle(false)

        } else {

            const allData = { id: new Date().getTime().toString(), name: title, desc: description }

            setItems([...items, allData]);
            setTitle('');
            setDescription('');
        }


    }


    // to delete the item 
    const deleteItem = (id) => {
        const updatedItems = items.filter((element) => {
            return element.id !== id;
        })

        setItems(updatedItems);
    }


    // to update the item -- setting the id of updated item so that we can update the changes in that item only 
    const editItem = (id) => {
        setToggle(true);
        const editedItem = items.find(element => {
            return element.id === id
        })

        setTitle(editedItem.name);
        setDescription(editedItem.desc);
        setIsEditItem(id);
    }



    // to store the added items in local storage 
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <div className="addItems">
                        <div className="addDetails">
                            <input type="text" placeholder='Title...' value={title} onChange={e => setTitle(e.target.value)} />
                            <input type="text" placeholder='Input...' value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="addBtn">
                            {/* add or update button based on toggle value */}
                            {toggle ? <button className='update-btn' onClick={addItems}>UPDATE</button> : <i className="fa-duotone fa-plus fa-4x" title='Add Item' onClick={addItems} />}

                        </div>
                    </div>

                    {/* ternary operator is used so that if items present then it will show the items over there otherwise will show no tasks */}
                    {items.length !== 0
                        ? (
                            <div className="show-items">
                                {
                                    items.map((element) => {
                                        return (
                                            <div className="item" key={element.id}>
                                                {/* props are passed to the TaskList where we render all the tasks list */}
                                                <TaskList name={element.name} desc={element.desc} id={element.id} edit={editItem} del={deleteItem} />
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                        : (
                            <div className="task-container">
                                <div className="content">
                                    <hr />
                                    <p>No Tasks</p>
                                    <hr className='hr1' />
                                </div>

                            </div>
                        )
                    }


                </div>
            </div>

        </>
    )
}

export default Todo
