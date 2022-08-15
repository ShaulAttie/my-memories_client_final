import { AUTH } from "../constanst/constantsType"
import * as api from "../API"

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up in the user
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data })

        navigate("/")
    } catch (error) {
        console.log(error);

    }
}