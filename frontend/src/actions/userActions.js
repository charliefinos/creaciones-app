import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"


// Execute an action to login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Send the info to the backend to Login
        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // Save the login info to LocalStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}