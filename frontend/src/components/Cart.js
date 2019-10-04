import React, {Fragment, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'


export default function Cart() {
    const [arr, setLocalArr] = useState([])
  
    const handleClearLocalstorage = (el) => {
        const items = JSON.parse(localStorage.getItem("allItems"))
        let found = items.findIndex(o => o.id === el.id)
        items.splice(found, 1)
        localStorage.setItem("allItems", JSON.stringify(items))
        setLocalArr(items)
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("allItems"))
        setLocalArr(items)
    }, [])
  
    return (
        <Fragment>
            <section className="cart container catalog">
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
                                            <td>{el.amount}</td>
                                            <td>{el.price} руб.</td>
                                            <td>{el.price * el.amount} руб.</td>
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
                            <input className="form-control" id="phone" placeholder="Ваш телефон"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" id="address" placeholder="Адрес доставки"/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement"/>
                            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}