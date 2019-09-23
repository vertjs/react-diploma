import React from 'react'
import Find from './Find'
import Catalog from './Catalog'

export default function CatalogPage() {
    
    return (
        <section className='container catalog'>
            <h2 className='text-center'>Каталог</h2>
            <Find/>
            <Catalog/>
        </section>
    )
}

