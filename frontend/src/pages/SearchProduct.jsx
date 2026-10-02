import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/home.css';
import PublicLayout from '../components/PublicLayout';

const SearchProduct = () => {
    const query = new URLSearchParams(useLocation().search).get('search-food') || '';
    const [foods, setFoods] = useState([])
    useEffect(() => {
        if (query) {
            sendDataBackend(query)
        }
    }, [query])

    const sendDataBackend =async (query) => {
        let response = await fetch(`http://127.0.0.1:8000/api/Foods_search/?q=${query}`)
        let data = await response.json()
        setFoods(data)
    }

    return (
        <PublicLayout>
            <div className="container foodSearch">
                <h3 className='text-primary text-center'>Results For : {query}</h3>
                <hr />
                <div className="row gy-3">
                    {foods.length> 0 ? (
                    foods.map((f) => {
                        return (<div className="col-12 col-sm-6 col-lg-4">
                            <div className="card card-food" >
                                <img src={`http://127.0.0.1:8000${f.image}`} className='card-img-top' alt="image" style={{ height: "200px" }} />
                                <div className="card-body">
                                    <div className="card-title">
                                        <Link to={'#'}>{f.item_name}</Link>
                                    </div>
                                    <p className="card-text text-muted">
                                        {f.item_description.slice(0,40) + "........"}
                                    </p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span className='fw-bold'>₹ {f.item_price}</span>
                                        {f.is_available ? (
                                           <Link to={'#'} className='btn btn-primary'><i class="fa-solid fa-cart-shopping me-1"></i>Order Now</Link>
                                        ) : (
                                            <div title='This food is not available , please try later'>
                                                <button to={'#'} className='btn btn-outline-danger'><i class="fa-solid fa-circle-xmark me-1"></i>Currently Unavailable</button>
                                            </div>
                                            
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    ) : (
                        <div>
                            <h2 className='text-center text-danger'>No Items Found</h2>
                        </div>
                    )}
                    

                </div>
            </div>
        </PublicLayout>
    )
}

export default SearchProduct
