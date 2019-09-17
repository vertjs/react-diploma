import {
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_SUCCESS
  } from './actionTypes';

export const fetchServicesRequest = () => ({ // запрос на сервер
  type: FETCH_SERVICES_REQUEST,
});
  
export const fetchServicesFailure = error => ({ // ошибка принятия данных
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});
  
export const fetchServicesSuccess = items => ({ // успешное принятие данных
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchServices = () => async (dispatch) => { // получение данных с сервера
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BESTSALES_URL}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(fetchServicesFailure(error.message));
  }
};