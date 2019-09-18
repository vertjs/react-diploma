import React, {useEffect}  from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import { fetchCategories } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Catalog() {
    const {items, loading, error} = useSelector(state => state.serviceCategories);
    const dispatch = useDispatch();
  
    useEffect(() => { // получение данных с сервера
      dispatch(fetchCategories())
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
                        <a href='#' className='nav-link' >{o.title}</a>
                    </li>
                ))}
            </ul>


            
            <div className='row'>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg'
                            className='card-img-top img-fluid' alt='Босоножки MYER'/>
                        <div className='card-body'>
                            <p className='card-text'>Босоножки 'MYER'</p>
                            <p className='card-text'>34 000 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/94/66/72/12946672_13518465_1000.jpg'
                            className='card-img-top img-fluid' alt='Босоножки Keira'/>
                        <div className='card-body'>
                            <p className='card-text'>Босоножки 'Keira'</p>
                            <p className='card-text'>7 600 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/99/04/32/12990432_13705715_1000.jpg'
                            className='card-img-top img-fluid' alt='Супергеройские кеды'/>
                        <div className='card-body'>
                            <p className='card-text'>Супергеройские кеды</p>
                            <p className='card-text'>1 400 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/93/06/52/12930652_13567910_1000.jpg'
                            className='card-img-top img-fluid' alt='Босоножки MYER'/>
                        <div className='card-body'>
                            <p className='card-text'>Босоножки 'MYER'</p>
                            <p className='card-text'>34 000 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/94/66/72/12946672_13518465_1000.jpg'
                            className='card-img-top img-fluid' alt='Босоножки Keira'/>
                        <div className='card-body'>
                            <p className='card-text'>Босоножки 'Keira'</p>
                            <p className='card-text'>7 600 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card catalog-item-card'>
                        <img src='https://cdn-images.farfetch-contents.com/12/99/04/32/12990432_13705715_1000.jpg'
                            className='card-img-top img-fluid' alt='Супергеройские кеды'/>
                        <div className='card-body'>
                            <p className='card-text'>Супергеройские кеды</p>
                            <p className='card-text'>1 400 руб.</p>
                            <a href='/products/1.html' className='btn btn-outline-primary'>Заказать</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-outline-primary'>Загрузить ещё</button>
            </div>
        </section>
    );
}
