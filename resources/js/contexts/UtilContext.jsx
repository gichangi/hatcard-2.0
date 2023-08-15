import { useReducer } from 'react';
import {
    UPDATE_MENU
} from '../store/actions';

import {useDispatch, useSelector} from "react-redux";



export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MENU:{
            const { list } = action.payload;
            return {
                ...state,
                list
            };
        }
        default: {
            return { ...state };
        }
    }
};

export function updateMenuAction(navMenuItems){
    return {
        "type": "UPDATE_MENU",
        "payload": {
            menuItems:navMenuItems
        }
    }
}

export const StoreProviderUpdate = (Obj) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const storeDispatch = useDispatch();

    storeDispatch(updateMenuAction(Obj));//update store
    dispatch(updateMenuAction(Obj));//update menu state by action
    const currentMenu= useSelector(state => state.menus.list)
    return currentMenu;
}

