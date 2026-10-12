import PublicLayout from "../components/PublicLayout"
import '../styles/home.css'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const [foods,setFoods]=useState([])
  useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/Foods_random/`)
        .then(a=>a.json())
        .then(data=>{
          setFoods(data)
        })
  },[])
  return (
    <>
      <PublicLayout>
        <section className="hero" style={{ backgroundImage: "url('/images/home_final.png')" }}>
          <div className="title">
            <h1>Quick And Hot Food Delivered To You</h1>
            <p className="lead">Craving Something Tasty ? Let's get To Your Door .</p>
            <form action="/search-food" method="get" className="d-flex">
              <input type="text" className="form-control" name="search-food" id="" placeholder="I Would Like To Eat"
                style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
              />
              <button className="btn btn-success" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', width: '150px' }}>Search</button>
            </form>
          </div>
        </section>

        <section className="mt-4">
          <div className="container py-5">
             <h4 className="text-center text-primary mb-2">Most Loved Dishes This Month <span className="btn btn-danger ms-1">Top Picks</span></h4>
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
                                           <Link to={`/food/${f.id}`} className='btn btn-primary'><i class="fa-solid fa-cart-shopping me-1"></i>Order Now</Link>
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
        </section>
      </PublicLayout>
    </>
  )
}

export default Home
