import React, { Fragment } from 'react'
import banner from '../img/banner.jpg'
import headerLogo from '../img/header-logo.png'
import { NavLink } from 'react-router-dom'
import { searchGoods } from '../actions/actionFunc'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'

export default function Menu() {
    const dispatch = useDispatch()
    const { history } = useReactRouter()
    const { count } = useSelector(state => state.serviceAmountGoods)

    const handleChangeIcon = () => { // скрыть/открыть иконку поиска
        const searchFormEl = document.querySelector('[data-id=search-form]')
        searchFormEl.classList.toggle('invisible')
        searchFormEl.querySelector('input').focus()
    }

    const handleChangeTextSearch = ({target}) => { // отправить текст поиска      
        if(target.value) {
            history.push('catalog')
            dispatch(searchGoods(target.value))
        }
    }

    const handleGoCart = () => { // перейти в корзину
       history.push('cart')
    }

    return (
        <Fragment>
            <header className='container'>
                <div className='row'>
                    <div className='col'>
                        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                        <NavLink to='/' exact className='navbar-brand'>
                            <img src={headerLogo} alt='Bosa Noga' />
                        </NavLink>
                        <div className='collapase navbar-collapse' id='navbarMain'>
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item active'>
                                    <NavLink to='/' exact className='nav-link'>Главная</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/catalog' exact className='nav-link'>Каталог</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/about' exact className='nav-link'>О магазине</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/contacts' exact className='nav-link'>Контакты</NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className='header-controls-pics'>
                                    <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={handleChangeIcon}></div>
                                    {/*<!-- Do programmatic navigation on click to /cart.html -->*/}
                                    <div className='header-controls-pic header-controls-cart' onClick={handleGoCart}>
                                        {count > 0 && (
                                            <Fragment>
                                                <div className='header-controls-cart-full'>{count}</div>
                                                <div className='header-controls-cart-menu'></div>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                                <form data-id='search-form' className='header-controls-search-form form-inline invisible'>
                                    <input className='form-control' placeholder='Поиск' onChange={handleChangeTextSearch}/>
                                </form>
                            </div>
                        </div>
                        </nav>
                    </div>
                </div>
                </header>
                <main className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='banner'>
                                <img src={banner} className='img-fluid' alt='К весне готовы!' />
                                <h2 className='banner-header'>К весне готовы!</h2>
                            </div>
                        </div>
                    </div>
                </main>
        </Fragment>
    );
}