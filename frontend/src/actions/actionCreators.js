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

    FIND_GOODS,
    ICON_GOODS_IN_CART,

    SEND_ORDER_GOODS,
    FETCH_DATA_ORDER_SUCCESS,
    FETCH_DATA_ORDER_FAILURE

  } from './actionTypes';

export const findGoods = (text) => ({ // поиск
  type: FIND_GOODS,
  payload: {
    text
  }
});

export const orderGoods = (order) => ({ // отправить заказ на сервер
  type: SEND_ORDER_GOODS,
  payload: {
    order
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

export const fetchDataOrderFailure = err => ({ // ошибка принятия данных заказа
  type: FETCH_DATA_ORDER_FAILURE,
  payload: {
    err,
  },
});

export const fetchDataOrderSuccess = (order) => ({ // успешное принятие данных заказа
  type: FETCH_DATA_ORDER_SUCCESS,
  payload: {
    order
  },
});
  
export const fetchDataCategoriesSuccess = (data, text) => ({ // успешное принятие данных каталога
  type: FETCH_DATA_CATEGORIES_SUCCESS,
  payload: {
    data,
    text
  },
});

export const iconGoodsInCart = count => ({ // иконка кол-ва товаров в корзине
  type: ICON_GOODS_IN_CART,
  payload: {
    count,
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
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        dispatch(fetchDataCategoriesSuccess(data))
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
      const data = await response.json()
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
  
export const amountGoodsInCart = (count) => (dispatch) => { // кол-во в корзине
  dispatch(iconGoodsInCart(count.length))
}

export const orderGoodsToServer = (order) => async (dispatch) => { // отправить заказ
  const orderJson = JSON.stringify(order)
  dispatch(orderGoods(orderJson))
  try {
    const response = await fetch(`${process.env.REACT_APP_ORDER_URL}`, {
      method: 'POST',
      'Access-Control-Allow-Origin': '*',
      headers: {'Content-Type': 'application/json'},
      body: orderJson,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(fetchDataOrderSuccess(order))
  } catch (error) {
    console.log(error)
    dispatch(fetchDataOrderFailure(error.message))
  }
}
