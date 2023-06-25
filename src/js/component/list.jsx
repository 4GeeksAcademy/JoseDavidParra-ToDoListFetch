import React, {useState} from "react";

const List = () => {

    const [contenido,setContenido] = useState('')
    const [tasks,setTasks] = useState([])

    const taskList = tasks.map((task,index)=>(
        <li key={index} className="ps-3 text-start list-group-item" style={{height:50+"px"}}>
            {task}
            <button type="button" className=" btn btn-danger rounded-circle border-3 float-end" onClick={()=>setTasks(tasks.filter((t,currentIndex) => index != currentIndex))}>X</button>
        </li>
    ))

    return(
        <div className="card container text-center w-25 mt-4" style={{width: 18+"rem"}}>
            <ul className="list-group list-group-flush">
                <li className=" mb-1 list-group-item"><input className=" w-100 ps-3 border-0" type="text" placeholder="Nueva tarea" value={contenido}
                onKeyDown={(e)=> {
                    if (e.key === "Enter" && contenido != ""){
                        setTasks(tasks.concat(contenido));
                        setContenido("");
                    }
                }}
                onChange={(e) => setContenido(e.target.value)} style={{height:50+"px"}}/></li>
                {taskList}
                <li className=" list-group-item">{tasks.length} Tareas</li>
            </ul>
        </div>
    );
    
}

export default List;