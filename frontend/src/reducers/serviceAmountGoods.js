import {ICON_GOODS_IN_CART} from '../actions/actionTypes'
const items = JSON.parse(localStorage.getItem("allItems"))

const initialState = {amount: items.length}

export default function serviceAmountGoodsReducer(state = initialState, action) {
    switch (action.type) {
        case ICON_GOODS_IN_CART:
        const {amount} = action.payload
        return {
        ...state,
        amount
        };
        default:
            return state;
    }
}