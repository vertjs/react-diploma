import { useState, useEffect } from 'react';

export default function useJsonFetch(url, initial) {
    const [data, setData] = useState(initial)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => setData(response) //setData(prev => [...prev, response])
            )
            
    }, [url])
    return [data];
}
