import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";



import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handle_logout() {
		actions.logout()
		navigate("/")
	}

	return (
		(store.auth === true ?  
	
		<>
			<div className="header">
                <h1 className="header-text text-center">---This is a user's private view---<br/> ---Esta es una vista provada del usuario---</h1>                
				
			</div>
		</>
		: alert("Usted no tiene acceso a esta vista."))
	);
};