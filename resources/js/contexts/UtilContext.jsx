import { useReducer } from 'react';
import {
    UPDATE_MENU_TREE
} from '../store/actions';

import {useDispatch, useSelector} from "react-redux";



export const menuReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MENU_TREE:{
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
        "type": "UPDATE_MENU_TREE",
        "payload": {
            menuItems:navMenuItems
        }
    }
}

export const StoreProviderUpdate = (Obj) => {
    const [state, dispatch] = useReducer(menuReducer, initialState);
    const storeDispatch = useDispatch();

    storeDispatch(updateMenuAction(Obj));//update store
    dispatch(updateMenuAction(Obj));//update menu state by action
    const currentMenu= useSelector(state => state.menus.list)
    return currentMenu;
}

