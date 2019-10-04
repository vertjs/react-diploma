import { useState, useEffect } from 'react';

export default function useIconCart() {
    const [order, setOrder] = useState(0)

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("allItems"))
        setOrder(items.length)
        console.log(items.length)
    }, [])
    return [order];
}
