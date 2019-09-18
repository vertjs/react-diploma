import React, {Fragment} from 'react'
import Bestsellers from './Bestsellers'
import Catalog from './Catalog'

export default function HeadPage() {
    return (
        <Fragment>
            <Bestsellers />
            <Catalog/>      
        </Fragment>
    );
}