import React from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { searchGoods } from '../actions/actionCreators'


export default function Find() {
    const {text} = useSelector(state => state.serviceSearch)
    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        dispatch(searchGoods(target.value))
    }

    return (
        <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск" value={text} onChange={handleChange} name='find'/>
        </form>
    )
}