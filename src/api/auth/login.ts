import axios from 'axios'

export const login = (userName: string, password: string) => {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/api/v1/security/login`,
		{
			username: userName,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}


export const register = (userName: string, password: string) => {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/api/v1/security/user/save`,
		{
			username: userName,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}