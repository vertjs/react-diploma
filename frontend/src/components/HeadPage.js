import React, {Fragment} from 'react'
import Bestsellers from './Bestsellers'

export default function HeadPage() {
    return (
        <Fragment>
            <section className='top-sales'>
                <h2 className='text-center'>Хиты продаж!</h2>

                <Bestsellers/>
            </section>

            <section className='catalog'>
                <h2 className='text-center'>Каталог</h2>

                <div className='preloader'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </section>             
        </Fragment>
    );
}