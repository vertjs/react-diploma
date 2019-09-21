import React, {useEffect, Fragment, useState}  from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import { fetchCategories, fetchDataCategories } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Catalog() {
    const {items, loading, error} = useSelector(state => state.serviceCategories)
    const {data, load, err} = useSelector(state => state.serviceDataCategories)
    const dispatch = useDispatch()
    const [id, setData] = useState({id: null})

    function handleClick(id) {
        dispatch(fetchDataCategories(id)) // получение данных каталога с сервера 
        setData({id: id})  
    }

    useEffect(() => { 
        dispatch(fetchCategories()) // получение заголовков с сервера
    }, [dispatch])
  

    if (loading) {
        return (
            <div className='preloader'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <p>Something went wrong try again</p>;
    }

    return (
        <section className='container catalog'>
            <h2 className='text-center'>Каталог</h2>

           <ul className='catalog-categories nav justify-content-center'>
                <li className='nav-item'>
                    <NavLink to='#' exact className='nav-link active'>Все</NavLink>
                </li>
                {items.map(o => (
                    <li className='nav-item' key={o.id}>
                        <p className='nav-link' onClick={() => handleClick(o.id)}>{o.title}</p>
                    </li>
                ))}
            </ul>
            {data && 
                (<Fragment>
                    <div className='row'>
                            {data.map(o => (
                                <div className='col-4' key={o.id}>
                                    <div className='card catalog-item-card'>
                                        <img src={o.images[0]} className='card-img-top img-fluid' alt={o.title}/>
                                        <div className='card-body'>
                                            <p className='card-text'>{o.title}</p>
                                            <p className='card-text'>{o.price} руб.</p>
                                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-outline-primary'>Загрузить ещё</button>
                    </div>
                </Fragment>)
            }
        </section>
    );
}
