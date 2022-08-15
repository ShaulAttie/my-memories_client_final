import { AUTH, LOGOUT } from '../constanst/constantsType'

const autoReducer = (state = { autoData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }

        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }

        default:
            return state
    }
}



export default autoReducer