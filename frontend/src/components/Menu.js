import React, {Fragment} from 'react'
import banner from '../img/banner.jpg'
import headerLogo from '../img/header-logo.png'
import {NavLink} from 'react-router-dom'

export default function Menu() {
   
    const henderClick = () => {
        const searchFormEl = document.querySelector('[data-id=search-form]')
        searchFormEl.classList.toggle('invisible')
        searchFormEl.querySelector('input').focus()    
    }

    return (
        <Fragment>
            <header className="container">
                <div className="row">
                    <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <NavLink to='/' exact className="navbar-brand">
                        <img src={headerLogo} alt="Bosa Noga" />
                    </NavLink>
                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to='/' exact className="nav-link">Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/catalog' exact className="nav-link">Каталог</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' exact className="nav-link">О магазине</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contacts' exact className="nav-link">Контакты</NavLink>
                            </li>
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={henderClick}></div>
                                {/*<!-- Do programmatic navigation on click to /cart.html -->*/}
                                <div className="header-controls-pic header-controls-cart">
                                    <div className="header-controls-cart-full">1</div>
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                            <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                <input className="form-control" placeholder="Поиск"/>
                            </form>
                        </div>
                        </div>
                    </nav>
                    </div>
                </div>
                </header>
                <main className="container">
                    <div className="row">
                        <div className="col">
                            <div className="banner">
                                <img src={banner} className="img-fluid" alt="К весне готовы!" />
                                <h2 className="banner-header">К весне готовы!</h2>
                            </div>
                        </div>
                    </div>
                </main>
        </Fragment>
    );
}