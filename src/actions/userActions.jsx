import { hist } from 'index.js' 

const axios = require("axios");
export const url = 'https://api.asgardev.ga';

var AuthUser = function () {
	var auth = sessionStorage.getItem("user");
	var id = sessionStorage.getItem("id");
	return {
		getAuth: function(type, id) {
			sessionStorage.setItem("user", type);
			sessionStorage.setItem("id", id);
			auth = sessionStorage.getItem("user");
			id = sessionStorage.getItem("id");
		},
		isAuthorized: function() {
			return auth;
		},
		identification: function() {
			return id;
		},
		endSession() {
			sessionStorage.removeItem("user");
			sessionStorage.removeItem("id");
			auth = undefined;
			id = undefined
		}
	}
};

var a = new AuthUser();

export const haveAccess = () => {
	return a.isAuthorized();
}

export const userID = () => {
	return a.identification();
}

export const logout = () => {
	a.endSession();
	hist.push("/intro");
}

export const login = (user, pass) => {
	axios.post(url + "login", { "email": user, "senha": pass })
	.then(resp => { a.getAuth(resp.data.tipo, resp.data.id); hist.push("/main") }).catch(e => {console.log(e); alert("Falha no login")});		
}
