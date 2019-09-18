import {
    FETCH_BESTSALES_REQUEST,
    FETCH_BESTSALES_FAILURE,
    FETCH_BESTSALES_SUCCESS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS
  } from './actionTypes';

export const fetchServicesRequest = () => ({ // запрос на сервер
  type: FETCH_BESTSALES_REQUEST,
});
  
export const fetchServicesFailure = error => ({ // ошибка принятия данных
  type: FETCH_BESTSALES_FAILURE,
  payload: {
    error,
  },
});
  
export const fetchServicesSuccess = items => ({ // успешное принятие данных
  type: FETCH_BESTSALES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchCategoriesRequest = () => ({ // запрос на сервер
  type: FETCH_CATEGORIES_REQUEST,
});
  
export const fetchCategoriesFailure = error => ({ // ошибка принятия данных
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});
  
export const fetchCategoriesSuccess = items => ({ // успешное принятие данных
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchBestSales = () => async (dispatch) => { // получение данных с сервера хитов продаж
  dispatch(fetchServicesRequest())
  try {
    const response = await fetch(`${process.env.REACT_APP_BESTSALES_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    dispatch(fetchServicesSuccess(data))
  } catch (error) {
    dispatch(fetchServicesFailure(error.message))
  }
};

export const fetchCategories = () => async (dispatch) => { // получение данных с сервера хитов продаж
  dispatch(fetchCategoriesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_CATEGORIES_URL}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(fetchCategoriesFailure(error.message));
  }
};