import {
    FETCH_DATA_CATEGORIES_REQUEST,
    FETCH_DATA_CATEGORIES_FAILURE,
    FETCH_DATA_CATEGORIES_SUCCESS

} from '../actions/actionTypes'

const initialState = {
    data: [],
    load: false,
    err: null,
}

export default function serviceCategoriesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_DATA_CATEGORIES_REQUEST:
        return {
          ...state,
          load: true,
          err: null,
        };
  
      case FETCH_DATA_CATEGORIES_FAILURE:
        const {err} = action.payload;
        return {
          ...state,
          load: false,
          err,
        };
  
      case FETCH_DATA_CATEGORIES_SUCCESS:
        const {data} = action.payload;
        return {
          ...state,
          data,
          load: false,
          err: null,
        };
  
      default:
        return state;
    }
}