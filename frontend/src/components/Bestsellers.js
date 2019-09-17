import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { fetchServices } from '../actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default function Bestsellers(props) {
    const {items, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();
  
    useEffect(() => { // получение данных с сервера
      dispatch(fetchServices())
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
            <ul onLoad={() => {fetchServices()}}> {/*медленная загрузка страницы */}
                {items.map(o => (
                    <li key={o.id}>
                        {o.title} {o.price}
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

Bestsellers.propTypes = {

}