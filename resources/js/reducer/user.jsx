import * as USERTYPES from '../actions/types'



const userReducer = (state = { list:[] ,status: 0, user: {}, me: null }, action) => {

    switch(action.type){

        case USERTYPES.FETCH_USERS:

            return {...state, list:action.payload}

        default:

            return state

    }

}

export default userReducer
