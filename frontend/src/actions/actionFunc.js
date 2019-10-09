import {
    findGoods, orderGoods, fetchServicesRequest, fetchServicesFailure,
    fetchServicesSuccess, fetchCategoriesRequest, fetchCategoriesFailure,
    fetchCategoriesSuccess, fetchDataCategoriesRequest, fetchDataCategoriesFailure,
    fetchDataOrderFailure, fetchDataOrderSuccess, fetchDataCategoriesSuccess,
    iconGoodsInCart
} from './actionCreators';

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