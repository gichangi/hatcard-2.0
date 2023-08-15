import * as USERTYPES from '../actions/types'



const userReducer = (state = { list:[] ,loggedIn: false,  }, action) => {

    switch(action.type){

        case USERTYPES.FETCH_USERS:

            return {...state, list:action.payload}

        case USERTYPES.SET_USER:

            return {...state, list:action.payload}
        case USERTYPES.LOG_OUT_USER:

            return {...state, list:action.payload}

        default:

            return state

    }

}

export default userReducer
