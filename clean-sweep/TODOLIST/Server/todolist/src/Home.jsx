/*
provides a user interface to display a list of todo tasks fetched from the server.
Create component adds new tasks.
*/
import React, { useState } from 'react'
import Create from'./Create'

/*
state variable 'todos' stors an array of todo tasks.
'useEffect' hook is used to fetch todo tasks from the server when the component mounts
Dependency array '[]' means it will only run once

*/
function Home() {
        const [todos, setTodos] = useState([])
        useEffect(() => {
            axios.get('http://localhost:3001/get')
            //storing result inside setTodos
            .then(result => setTodos(result.data))
                .catch(err => console.log(err))
        }, [])
    return (
        //this displays "Todo List" as header
        //todo.task displays tasks in list
        /*
        'Create' component renders a form for creating new todo tasks
        */
        <div className='home'>
            <h2>Todo List</h2>
            <Create />
            <br />
            {
                todos.length === 0
                ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <p>{todo.task}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Home