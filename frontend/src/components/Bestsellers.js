import React, {Fragment, useEffect} from 'react'
import { fetchBestSales } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Bestsellers() {
    const {items, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
  
    useEffect(() => { // получение данных с сервера
      dispatch(fetchBestSales())
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
            <div className="container">
                <div className="row">
                    <section className='top-sales'>
                        <h2 className='text-center'>Хиты продаж!</h2>
                        <div className="row">
                            {items.map(o => (
                                <div className="col-4" key={o.id} onLoad={() => {fetchBestSales()}}> {/* загрузка страницы */}
                                    <div className="card">
                                        <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title}/>
                                        <div className="card-body">
                                            <p className="card-text">{o.title.split(' ', 2).join(' ')}</p>
                                            <p className="card-text">{o.price} руб.</p>
                                            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}