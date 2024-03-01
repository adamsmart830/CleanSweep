/*
creates form where users can input tasks.
when Add button is clicked, the task is sent to a server-side application
using Axios for further processing
*/

import React, { useState } from 'react'
//axios makes HTTP requests to the server
import axios from 'axios'

function Create() {
    //variable to store what's being put in text input field
    //'task' variable stores the value entered into the input field
    const [task, setTask] = useState()
    //handleAdd sends a POST request to a server endpoint (the included link)
    //with the task data
    const handleAdd = () => { //function for passing data to serverside app
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return(
        //create two input fields: place for text, button to add the text to list
        //whenever button is pressed memory card should be entered and moved to server side. 
        //Clicing handleAdd button calls handleAdd function
        /*
        'onChange' event handler on the input field updates the 'task' state whenver
        the input changes.
        'onClick' event handler on the button calls the 'handleAdd' function
        when the button is clicked
        */
        <div className='create_form'>
            <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}/>
            <button type="button" onClick={handleAdd}>Add</button> 
        </div>
    )
}

export default Create