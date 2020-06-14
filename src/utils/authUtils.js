import axios from 'axios';

export const isLogin = () => {
    return !!localStorage.getItem('tokens')
}

export const unsetToken = () => {
    localStorage.removeItem("tokens")
}

export const checkToken = () => {
    return axios({
        method: 'post',
        url: '/auth/get-login',
        credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': true
		}
    })
}