import React, {Fragment} from 'react'
import banner from '../img/banner.jpg'
import headerLogo from '../img/header-logo.png'
import {NavLink} from 'react-router-dom'

function App() {
   
    const henderClick = (evt) => {
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

                            <section className="top-sales">
                                <h2 className="text-center">Хиты продаж!</h2>

                                <div className="preloader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </section>

                            <section className="catalog">
                                <h2 className="text-center">Каталог</h2>

                                <div className="preloader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <footer className="container bg-light footer">
                <div className="row">
                    <div className="col">
                        <section>
                            <h5>Информация</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink to='/about' exact className="nav-link">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/catalog' exact className="nav-link">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/contacts' exact className="nav-link">Контакты</NavLink>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="col">
                        <section>
                            <h3>Принимаем к оплате:</h3>
                                <div className="footer-pay">
                                    <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                                    <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                                    <div className="footer-pay-systems footer-pay-systems-visa"></div>
                                    <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                                    <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                                    <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                                </div>
                        </section>
                        <section>
                            <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
                                Все права защищены.
                                <br/>Доставка по всей России!
                            </div>
                        </section>
                    </div>
                    <div className="col text-right">
                        <section className="footer-contacts">
                            <h5>Контакты:</h5>
                                <NavLink to='/tel:+7-495-790-35-03' exact className="footer-contacts-phone">+7 495 79 03 5 03</NavLink>
                                <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
                                <NavLink to='/mailto:office@bosanoga.ru' exact className="footer-contacts-email">office@bosanoga.ru</NavLink>
                                <div className="footer-social-links">
                                    <div className="footer-social-link footer-social-link-twitter"></div>
                                    <div className="footer-social-link footer-social-link-vk"></div>
                                </div>
                        </section>
                    </div>
                </div>
            </footer>
        </Fragment>
  );
}

export default App;