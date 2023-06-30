import React, {useEffect,useState} from "react";

//create your first component
const Home = () => {

    const [contenido,setContenido] = useState('')
    const [tasks,setTasks] = useState([])
    const [update,setUpdate] = useState(false)

    function createUser(){
        fetch('http://assets.breatheco.de/apis/fake/todos/user/josedpb14',{
            method:'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body:JSON.stringify([])})
            .then(()=>getTasks())
    }

    function getTasks(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/josedpb14',{
            method:'GET',
        })
        .then((response)=>{
            if (response.status === 404) {
                createUser()
                
            }
            console.log(response);
            return(response.json())
        })
        .then((data)=>{
            console.log(data);
            setTasks(data)
        })
        .catch((error)=>console.log(error))
    }

    function updateTasks(){
        if (update) {
            fetch('https://assets.breatheco.de/apis/fake/todos/user/josedpb14',{
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
        })
        .then((response)=>console.log(response))
        setUpdate(false)
        }
    }

    function deleteTask(index){
        setUpdate(true)
        if (tasks.length!=1) {
            setTasks(tasks.filter((t,currentIndex) => index != currentIndex))
        }else{
            setTasks({label:"Sample task",done:false})
        }
        
    }

    function deleteAllTasks(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/josedpb14',{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response)=>{
            if(response.ok){
                console.log("Datos eliminados correctamente.");
            }else{
                console.log("Error al borrar los datos.");
            }
        })
        .then(()=>createUser())
    }

    useEffect(()=>{updateTasks()},[tasks])
    useEffect(()=>{getTasks()},[])
	return (
		<div className="my-3">
			<div className="row text-center m-3 align-items-center" style={{height: 100+"px"}}>
				<h1 className="" style={{fontSize:700+"%"}}>ToDo's</h1>
			</div>
			<div className="card container text-center w-25 mt-4" style={{width: 18+"rem"}}>
				<ul className="list-group list-group-flush">
					<li className=" mb-1 list-group-item"><input className=" w-100 ps-3 border-0" type="text" placeholder="Nueva tarea" value={contenido}
					onKeyDown={(e)=> {
						if (e.key === "Enter" && contenido != ""){
                            let task={label:contenido,done:false}
                            setUpdate(true)
							setTasks(tasks.concat(task))
							setContenido("")
							
						}
					}}
					onChange={(e) => setContenido(e.target.value)} style={{height:50+"px"}}/></li>
					{tasks.slice(1).map((item,index)=>(
                        <div className="list-group-item d-flex align-items-center" >
                            <li key={index} className="ps-3 text-start col">{item.label}</li>
                            <button type="button" className=" btn btn-danger rounded-circle border-3 float-end" onClick={()=>{deleteTask(index)}}>X</button>
                        </div>
                    ))}
					<li className=" list-group-item">{tasks.length-1} Tareas</li>
				</ul>
                <div className="text-center">
                    <button className="btn btn-primary my-1 text-center mx-1" type="button" onClick={deleteAllTasks} >Eliminar Tareas</button>
                </div>
			</div>
		</div>
	);
};

export default Home;