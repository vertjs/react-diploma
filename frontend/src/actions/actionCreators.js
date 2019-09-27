import {
    FETCH_BESTSALES_REQUEST,
    FETCH_BESTSALES_FAILURE,
    FETCH_BESTSALES_SUCCESS,

    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,

    FETCH_DATA_CATEGORIES_REQUEST,
    FETCH_DATA_CATEGORIES_FAILURE,
    FETCH_DATA_CATEGORIES_SUCCESS,

    FIND_GOODS

  } from './actionTypes';

export const findGoods = (text) => ({ // поиск
  type: FIND_GOODS,
  payload: {
    text
  }
});

export const fetchServicesRequest = () => ({ // запрос на сервер для хитов продаж
  type: FETCH_BESTSALES_REQUEST,
});
  
export const fetchServicesFailure = error => ({ // ошибка принятия хитов продаж
  type: FETCH_BESTSALES_FAILURE,
  payload: {
    error,
  },
});
  
export const fetchServicesSuccess = items => ({ // успешное принятие хитов продаж
  type: FETCH_BESTSALES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchCategoriesRequest = () => ({ // запрос на сервер для заголовков
  type: FETCH_CATEGORIES_REQUEST,
});
  
export const fetchCategoriesFailure = error => ({ // ошибка принятия заголовков
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});
  
export const fetchCategoriesSuccess = items => ({ // успешное принятие заголовков
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchDataCategoriesRequest = () => ({ // запрос на сервер для каталога
  type: FETCH_DATA_CATEGORIES_REQUEST,
});
  
export const fetchDataCategoriesFailure = err => ({ // ошибка принятия данных каталога
  type: FETCH_DATA_CATEGORIES_FAILURE,
  payload: {
    err,
  },
});
  
export const fetchDataCategoriesSuccess = (data, text) => ({ // успешное принятие данных каталога
  type: FETCH_DATA_CATEGORIES_SUCCESS,
  payload: {
    data,
    text
  },
});

export const fetchBestSales = () => async (dispatch) => { // получение с сервера хитов продаж
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

export const fetchCategories = () => async (dispatch) => { // получение с сервера заголовков продаж
  dispatch(fetchCategoriesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_CATEGORIES_URL}`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const fetchDataCategories = (id=false, offset=false, text=false) => async (dispatch) => { // получение с сервера каталога продаж
  dispatch(fetchDataCategoriesRequest());
  if(id && !offset && !text) { // 1
    try {
      const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id}`)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json()
      dispatch(fetchDataCategoriesSuccess(data));
    } catch (error) {
      console.log(error)
      dispatch(fetchDataCategoriesFailure(error.message))
    }
    } else if(id && !offset && text) { //2
      try {
        const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id + '&q=' + text}`)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        dispatch(fetchDataCategoriesSuccess(data, text))
      } catch (error) {
        console.log(error);
        dispatch(fetchDataCategoriesFailure(error.message))
      }
    } else if(id && offset) { //3
      try {
        const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id + offset}`)
        console.log(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id + offset}`)
        console.log(text);
        
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        dispatch(fetchDataCategoriesSuccess(data))
        console.log(data);
      } catch (error) {
        console.log(error);
        dispatch(fetchDataCategoriesFailure(error.message))
      }
  } else if(!id && !offset && !text) { //4
      try {
        const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL}`)
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json()
        dispatch(fetchDataCategoriesSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(fetchDataCategoriesFailure(error.message));
      }
  }  else if(!id && !offset && text) { //5
    try {
      const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?q=' + text}`)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      console.log(text);
      dispatch(fetchDataCategoriesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchDataCategoriesFailure(error.message));
    }
  } else if(!id && offset && text) { // 6
    try {
      const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?q=' + text + offset}`);
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      console.log(text);
      dispatch(fetchDataCategoriesSuccess(data, text));
    } catch (error) {
      console.log(error);
      dispatch(fetchDataCategoriesFailure(error.message));
    }
}
   else if(!id && offset && !text) { //7
      try {
        const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?' + offset}`);
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        
        dispatch(fetchDataCategoriesSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(fetchDataCategoriesFailure(error.message));
      }
  }
};

export const searchGoods = (text) => async (dispatch) => {
  dispatch(findGoods(text))

  try {
    const response = await fetch(`${process.env.REACT_APP_FIND_GOODS_URL + text}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    dispatch(fetchDataCategoriesSuccess(data))
 
  } catch (error) {
    dispatch(fetchDataCategoriesSuccess(error.message))
  }
};

export const fetchDataProduct = (id) => async (dispatch) => { // данные одного товара
  dispatch(fetchDataCategoriesRequest())
    try {
      const response = await fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + id}`)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json()
      dispatch(fetchDataCategoriesSuccess(data));
    } catch (error) {
      console.log(error)
      dispatch(fetchDataCategoriesFailure(error.message))
    }
}
  