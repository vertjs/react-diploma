import React, {useState, useEffect} from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { fetchDataProduct } from '../actions/actionCreators'
import useJsonFetch from '../hooks/useJsonFetch'


export default function ProductPage({match}) {
    let matchId = (match.params.id)
    let num = matchId.match(/\d+/)
    const url = process.env.REACT_APP_DATA_CATEGORIES_URL + '/' + num[0]
    const [data] = useJsonFetch(url, {})
    
    const [form, setForm] = useState({
        image: '',
        title: '',
        sku: '',
        manufacturer: '',
        color: '',
        material: '',
        season: '',
        reason: ''
    })
    
    useEffect(() => {
        
        if(data.id !== undefined) {
            console.log(data.images[0]);
            setForm({
                image: data.images[0],
                title: data.title,
                sku: data.sku,
                manufacturer: data.manufacturer,
                color: data.color,
                material: data.material,
                season: data.season,
                reason: data.reason,
                sizes: data.sizes
            })
        }
    }, [data])
   

    return (
        <section className="catalog-item">
            <h2 className="text-center">{form.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={form.image}
                        className="img-fluid" alt={form.title}/>
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{form.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{form.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{form.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{form.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{form.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{form.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии: {console.log(form.sizes)}
                          {/* {form.sizes.map(o => {
                                if(o.avalible) {
                                    return  <span className="catalog-item-size selected">{o.sizes}</span>;
                                } else return;
                            })} */}
                        </p> 
                        <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary">-</button>
                                <span className="btn btn-outline-primary">1</span>
                                <button className="btn btn-secondary">+</button>
                            </span>
                        </p>
                    </div>
                    <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                </div> 
            </div> 
        </section>
    )
            
}