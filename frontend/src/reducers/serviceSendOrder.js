import { SEND_ORDER_GOODS } from '../actions/actionTypes'

const initialState = {order: ''}

export default function serviceSendOrderReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_ORDER_GOODS:
        const {order} = action.payload
        return {
        ...state,
        order
        };
        default:
            return state;
    } 
}