import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { amountGoodsInCart, orderGoodsToServer, iconGoodsInCart } from '../actions/actionCreators'

export default function Cart() {
    const [arr, setLocalArr] = useState([])
    const dispatch = useDispatch()
    const [mark, setMark] = useState(false) // флаг для стиля кнопки "Оформить"
    const [inputData, setInputData] = useState({
        phone: '',
        address: '',
        agree: false
    })

    const handleClearLocalstorage = (el) => { // удалить из карзины
        const items = JSON.parse(localStorage.getItem("allItems"))
        let found = items.findIndex(o => o.id === el.id)
        items.splice(found, 1)
        localStorage.setItem("allItems", JSON.stringify(items))
        setLocalArr(items)
        dispatch(amountGoodsInCart(items))
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("allItems"))
        setLocalArr(items)
    }, [])

    const handleInputData = ({target}) => { // данные для оформления заказа
        const {id, value} = target
        setInputData(prev => ({...prev, [id]: value}))    
        setMark(true)
    }

    const handleSendData = (evt) => { // оформить заказ
        evt.preventDefault()
        console.log(arr)
        console.log(inputData)
        console.log(mark)
        if(arr && mark) {
            const allowedOrder = ['count', 'id', 'price']
            const allowedAccaunt = ['phone', 'address']

            const goods = arr.map( el => { // заказанные товары
                let filteredOrder = Object.keys(el)
                    .filter( key => allowedOrder.includes(key) )
                    .reduce((obj, key) => {
                        return {
                            ...obj, [key]: el[key]
                        };
                    }, {})
                return filteredOrder;
            })

            const filteredAccaunt = Object.keys(inputData) // контакты заказчика
                .filter( key => allowedAccaunt.includes(key) )
                .reduce((obj, key) => {
                    return {
                        ...obj, [key]: inputData[key]
                    };
                }, {})

            const data = Object.assign({}, {'owner': filteredAccaunt}, {'items': goods}) // объединение данных для отправки
            dispatch(orderGoodsToServer(data))
            localStorage.clear()
            setLocalArr([]) // очистка localStorage
            setInputData({ // очистка state
                phone: '',
                address: '',
                agree: false
            })
            dispatch(iconGoodsInCart(0))
        }
        return;
    }
  
    return (
        <Fragment>
            <section className="cart container">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr && 
                            (<Fragment>
                                {arr.map((el, id) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{id + 1}</th>
                                            <td><NavLink to={'/catalog/' + el.id}>{el.title}</NavLink></td>
                                            <td>{el.size}</td>
                                            <td>{el.count}</td>
                                            <td>{el.price} руб.</td>
                                            <td>{el.price * el.count} руб.</td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm" 
                                                onClick={() => handleClearLocalstorage(el)}>Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                )}
                                <tr>
                                    <td colSpan="5" className="text-right">Общая стоимость</td>
                                    <td>{arr.reduce((acc, el) => acc + el.price, 0)} руб.</td>
                                </tr>
                            </Fragment>)
                        }
                    </tbody>
                </table>
            </section>
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{maxWidth: '30rem', margin: 'auto'}}>
                    <form className="card-body">
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input className="form-control" id="phone" placeholder="Ваш телефон" onChange={handleInputData} value={inputData.phone}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" id="address" placeholder="Адрес доставки" onChange={handleInputData} value={inputData.address}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" onChange={handleInputData}/>
                            <label className="form-check-label" htmlFor="agreement" >Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary" disabled={mark ? false : true} onClick={handleSendData}>
                            Оформить
                        </button>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}