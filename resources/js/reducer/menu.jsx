import * as USERTYPES from '../actions/types'



const menuReducer = (state = { list:[]   }, action) => {

    switch(action.type){

        case USERTYPES.FETCH_MENU:

            return {...state, list:action.payload}

        case USERTYPES.UPDATE_MENU:

            return {...state, list:action.payload}

        default:

            return state

    }

}

export default menuReducer
