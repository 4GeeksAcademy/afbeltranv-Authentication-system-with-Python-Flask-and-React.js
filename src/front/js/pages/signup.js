import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail]=useState("")
	const [password, setPassword]=useState("")

	const sendSignup = ()=>{
		actions.signup(email, password)

	}

	return (
		<div className="text-center mt-5">
			<h1>Sign up!</h1>
			{store.auth=== true ? <Navigate to='/demo'/>:
			<div>
				<div>
					<h2>Please enter your email</h2>
					<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div>
					<h2>Please enter your password</h2>
					<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>				
				</div>
				<button onClick={sendSignup}>Sign Up!</button>
			</div>}
			
			
			
		</div>
	);
};
