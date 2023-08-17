import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail]=useState("")
	const [password, setPassword]=useState("")

	const sendLogin = ()=>{
		actions.login(email, password)

	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{store.auth=== true ? <Navigate to='/private'/>:
			<div>
				<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<button onClick={sendLogin}>Login</button>
			</div>}
			
			
			
		</div>
	);
};
