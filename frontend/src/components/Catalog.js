import React, {useEffect, Fragment, useState}  from 'react'
import {NavLink} from 'react-router-dom'
import { fetchCategories, fetchDataCategories, searchGoods } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Catalog() {
    const {items, loading, error} = useSelector(state => state.serviceCategories)
    const {data} = useSelector(state => state.serviceDataCategories)
    const {text} = useSelector(state => state.serviceSearch)
    const dispatch = useDispatch()
    const [index, setIndex] = useState(null)
    const offset = '&offset='
    let [num, setNum] = useState(6)
    let title = React.createRef()
    let price = React.createRef()

    function handleClick(evt, id) {
        [...document.querySelectorAll('.justify-content-center > .nav-item > .nav-link')].map(o => o.classList.remove('active'))
        evt.target.classList.add('active')
        dispatch(fetchDataCategories(id, '', text)) // загрузка данных каталога с сервера по клику
        setIndex(id)
        setNum(6)
    }
    
    function yetClick() {
       let sum = parseInt(num)+6
       setNum(() => sum)
       let out = offset + num
       dispatch(fetchDataCategories(index, out, text))
    }

    useEffect(() => { 
        dispatch(fetchCategories()) // загрузка заголовков с сервера
        dispatch(fetchDataCategories()) // загрузка каталога с сервера
        dispatch(searchGoods(text)) // загрузка каталога по результатам поиска из items 
    }, [text, dispatch])

    const hendleRef = (evt) => {
        console.log(evt.target);
        console.log(title.current.textContent);
        localStorage.setItem('title', JSON.stringify({'title': title.current.textContent}))
        localStorage.setItem('price', JSON.stringify({'price': price.current.textContent}))
    }


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
                            <div className='col-4' key={o.id} >
                                <div className='card catalog-item-card' >
                                    <img src={o.images[0]} className='card-img-top img-fluid' alt={o.title} style={{ width: '90%', height: 200, objectFit: 'cover' }}/>
                                    <div className='card-body'>
                                        <p className='card-text' ref={title}>{o.title}</p>
                                        <p className='card-text' ref={price}>{o.price} руб.</p>
                                        <NavLink to={'/catalog/' + o.id} exact className='btn btn-outline-primary' onClick={hendleRef}>
                                            Заказать
                                        </NavLink>
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



