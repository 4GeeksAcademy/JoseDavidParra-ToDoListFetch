import React from "react";
import List from "./list";

//create your first component
const Home = () => {
	return (
		<div>
			<div className="row text-center m-3 align-items-center" style={{height: 100+"px"}}>
				<h1 className="" style={{fontSize:700+"%"}}>ToDo's</h1>
			</div>
			<List></List>
		</div>
	);
};

export default Home;