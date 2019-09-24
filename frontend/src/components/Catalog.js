import React, {useEffect, Fragment, useState}  from 'react'
//import PropTypes from 'prop-types'
//import {NavLink} from 'react-router-dom'
import { fetchCategories, fetchDataCategories } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Catalog() {
    const {items, loading, error} = useSelector(state => state.serviceCategories)
    const {data} = useSelector(state => state.serviceDataCategories)
    const {text} = useSelector(state => state.serviceSearch)
    const dispatch = useDispatch()
    const [index, setIndex] = useState(null)
    const offset = '&offset=6'
    
    function filterItems(query) {
        return data.filter((el) => {
           return el.title.replace(/\s+/g, '').trim().toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    function handleClick(evt, id) {
        [...document.querySelectorAll('.justify-content-center > .nav-item > .nav-link')].map(o => o.classList.remove('active'))
        evt.target.classList.add('active')
        filterItems(text)
        dispatch(fetchDataCategories(id)) // загрузка данных каталога с сервера по клику
        setIndex(id)
    }

    function yetClick() {
        dispatch(fetchDataCategories(index, offset)) // загрузить еще
    }

    useEffect(() => { 
        dispatch(fetchCategories()) // загрузка заголовков с сервера
        dispatch(fetchDataCategories()) // загрузка каталога с сервера
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
        <Fragment>
            <ul className='catalog-categories nav justify-content-center'>
                <li className='nav-item'>
                    <p className='nav-link active' onClick={(evt) => handleClick(evt)}>Все</p>
                </li>
                {items.map(o => (
                    <li className='nav-item' key={o.id}>
                        <p className='nav-link' onClick={(evt) => handleClick(evt, o.id)}>{o.title}</p>
                    </li>
                ))}
            </ul>
            {data && 
                (<Fragment>
                    <div className='row'>
                        {data.map(o => (
                            <div className='col-4' key={o.id}>
                                <div className='card catalog-item-card' >
                                    <img src={o.images[0]} className='card-img-top img-fluid' alt={o.title} style={{ width: '90%', height: 200, objectFit: 'cover' }}/>
                                    <div className='card-body'>
                                        <p className='card-text'>{o.title}</p>
                                        <p className='card-text'>{o.price} руб.</p>
                                        <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {data.length === 6 &&
                    <div className='text-center'>
                        <button className='btn btn-outline-primary' onClick={() => yetClick()}>Загрузить ещё</button>
                    </div>}
                </Fragment>)
            }
        </Fragment>
    );
}



