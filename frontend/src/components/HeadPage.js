import React, { Fragment } from 'react'
import Bestsellers from './Bestsellers'
import Catalog from './Catalog'

export default function HeadPage() {
    return (
        <Fragment>
            <Bestsellers />
            <section className='container catalog'>
                <h2 className='text-center'>Каталог</h2>
                <Catalog/>  
            </section>
        </Fragment>
    );
}