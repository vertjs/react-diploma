import React from 'react'
import PropTypes from 'prop-types'

export default function Search(props) {
    return (
        <form className='catalog-search-form form-inline'>
            <input className='form-control' placeholder='Поиск'/>
        </form>
    )
}

