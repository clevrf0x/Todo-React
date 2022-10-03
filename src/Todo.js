import "./Todo.css";

import { useEffect, useState } from "react";

export default function Todo() {
  // for displaying current day
  const date = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // States
  const [toDos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos) {
      return JSON.parse(savedTodos);
    }
    else {
      return []
    }
  });

  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));

  }, [toDos])

  return (
    <div className="App">
      <header className="App-header">
        {/* Title */}
        <div>
          <h1>daily tasks</h1>
          <p>
            It's <span className="code">{weekday[date.getDay()]}</span>
          </p>
        </div>

        {/* Add task input */}
        <div>
          <input value={todo} onChange={event => {setTodo(event.target.value)}} type="text" placeholder="Add a task" className="add_task" />
          <button onClick={() => {setTodos([...toDos, {id: Date.now(), text: todo, status: false}])}} className="add_task_btn">add</button>
        </div>

        {/* In progress tasks */}
        <div className="taskbox">
          <h3 className="task_heading">Progress</h3>
          <div className="todos">
            {
              toDos.map((value) => {
                if (!value.status) {
                  return (
                    <div className="todo-group">
                      <input value={value.status} onChange={event => setTodos(toDos.filter(obj => {
                        if(obj.id === value.id) {
                          obj.status = event.target.checked
                        }
                        console.log(obj);
                        return obj
                      })
                      )} 
                      type="checkbox" name="" />
                      <div className="task">
                        <p className="todo">{value.text}</p>
                        <i class="fa-solid fa-xmark del-icon" onClick={() => setTodos(toDos.filter((obj) => obj.id !== value.id))}></i>
                      </div>
                      
                    </div>
                    )
                }
                return null
              })
            }
          </div>
        </div>


        {/* Completed tasks */}
        <div className="taskbox">
          <h3 className="task_heading">Completed</h3>
          <div className="todos">
          {
              toDos.map((value) => {
                if (value.status) {
                  return (
                    <div className="todo-group">
                      <input value={value.status} onChange={event => setTodos(toDos.filter(obj => {
                        if(obj.id === value.id) {
                          obj.status = event.target.checked
                        }
                        console.log(obj);
                        return obj
                      })
                      )} 
                      type="checkbox" name="" checked/>
                      <div className="task">
                        <p className="todo"><s>{value.text}</s></p>
                        <i class="fa-solid fa-xmark del-icon" onClick={() => setTodos(toDos.filter((obj) => obj.id !== value.id))}></i>
                      </div>
                    </div>
                    )
                }
                return null
              })
            }
          </div>
        </div>

        {/* Filtered Cards to display tasks */}
        {/* All Tasks */}
        {/* <div className="taskbox">
          <h3 className="task_heading">All</h3>

          
          <div className="todos">
              {
                toDos.map(value => {

                  return (
                  <div className="todo-group">
                    <input value={value.status} onChange={event => setTodos(toDos.filter(obj => {
                      if(obj.id === value.id) {
                        obj.status = event.target.checked
                      }
                      console.log(obj);
                      return obj
                    })
                    )} 
                    type="checkbox" name="" />
                    <p className="todo">{value.text}</p>
                  </div>
                  )
                })
              }
          </div>
        </div> */}

      </header>
    </div>
    
  );
}


