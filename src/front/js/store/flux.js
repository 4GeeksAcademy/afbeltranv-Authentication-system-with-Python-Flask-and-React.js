const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			flashMessageRegister: null
		},
		actions: {
			login: (email, password)=>{
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");			

				const raw = JSON.stringify({
				"email": email,
				"password": password
				});

				const requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
		};
				fetch("https://fantastic-space-adventure-9vgvx6wqp7726wg-3001.app.github.dev/api/login", requestOptions)
				.then(response => {
					if (response.status===200) {
						setStore({auth:true})
					}
					else 
					alert("There has been an error")
					return response.json()})
					
				.then(data => {
					console.log("From backend",data)
					localStorage.setItem("token", data.access_token)
				})
				.catch(error => console.log('error', error));


				console.log("Envia info login")

			},

			logout: ()=>{
				console.log("Logout")
				setStore({auth:false})
				localStorage.removeItem("token")
			},


			signup: (email,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,							
							"password": password
						}
					)
				};
				fetch(process.env.BACKEND_URL +"/api/signup", requestOptions)
					.then(response => {
						return response.json().then(data => {
						if (response.ok) {
							return { status: response.status, data: data };
						} else {
							throw { status: response.status, data: data };
						}
						});
					})
				  	.then(({ status, data }) => {
						if (data.flash_message) {
						setStore({ flashMessageRegister: data.flash_message });
						}
						if (status === 200) {
							setStore({ flashMessageRegister: data.flash_message });
						  }
				  	})
					.catch(error => {
					console.error('Error:', error);
					if (error.status === 401) {
						if (error.data.flash_message) {
						setStore({ flashMessageRegister: error.data.flash_message });
						}
					}})
				},




			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
