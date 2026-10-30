import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider';

const FoodMenu = () => {
    const navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    const [foods, setFoods] = useState([])
    const [filterFoods, setFilterFoods] = useState([])
    const [searchFoods, setSearchFoods] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(500)
    const [currentPage, setCurrentPage] = useState(1)
    const foodPerPage = 5
    console.log(currentPage)
    useEffect(() => {
        if (!userId) {
            navigate('/user-login')
        }

        fetch(`http://127.0.0.1:8000/api/Foods_list/`)
            .then(a => a.json())
            .then(data => {
                setFoods(data)
                setFilterFoods(data)
            })

        fetch(`http://127.0.0.1:8000/api/category_list/`)
            .then(a => a.json())
            .then(data => {
                setCategories(data)
            })

    }, [userId])

    const handleSearch = (e) => {
        let searchValue = e.target.value;
        setSearchFoods(searchValue);
        applyFilters(searchValue, selectedCategory)

    };

    const handleCategoty = (val) => {
        setSelectedCategory(val)
        applyFilters(searchFoods, val)
    }

    const applyFilters = (searchTerm, Category) => {
        let result = foods
        if (searchTerm) {
            result = result.filter((food) => {
                return food.item_name.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        if (Category !== 'All') {
            result = result.filter((food) => {
                return food.category_name.toLowerCase() === Category.toLowerCase();
            });
        }

        result = result.filter((food) => {
            return food.item_price >= minPrice && food.item_price <= maxPrice
        })

        setFilterFoods(result);

    }

    let LastPageIndex = foodPerPage * currentPage
    let firstIndex = LastPageIndex - foodPerPage
    let totalPage = Math.ceil(filterFoods.length/foodPerPage)
    let currentFoods = filterFoods.slice(firstIndex, LastPageIndex);
    console.log(currentFoods)
    return (
        <PublicLayout>
            <div className="container py-5" style={{ marginTop: '70px' }}>
                <h4 className="text-center text-primary mb-2"><span className="btn btn-danger ms-1">Find your delicious foods here</span></h4>
                <div className="row mt-4">
                    <div className="col-12 col-md-8">
                        <form action="">
                            <input type="search" value={searchFoods} onChange={handleSearch} name="" id="" placeholder='Find your delicious foods here' className='form-control' />
                        </form>
                    </div>

                    <div className="col-12 col-md-4">
                        <select name="" id="" className='form-select' onChange={(e) => handleCategoty(e.target.value)}>
                            <option value="All">All Categories</option>
                            {categories.map((c, index) => {
                                return <option key={index} value={c.category_name}>{c.category_name}</option>
                            })}
                        </select>
                    </div>

                </div>

                <div className="row mt-3">
                    <label className="text-primary fw-bold">
                        Filter by Price: ₹{minPrice} - ₹{maxPrice}
                    </label>

                    <Slider
                        range
                        min={0}
                        max={500}
                        step={10}
                        value={[minPrice, maxPrice]}
                        onChange={(value) => {
                            setMinPrice(value[0]);
                            setMaxPrice(value[1]);

                            applyFilters(
                                searchFoods,
                                selectedCategory
                            );
                        }}
                    />
                </div>

                <hr />
                <div className="row gy-3">
                    {currentFoods.length > 0 ? (
                        currentFoods.map((f) => {
                            return (<div className="col-12 col-sm-6 col-lg-4" key={f.id}>
                                <div className="card card-food" >
                                    <div className='position-relative'>
                                        <img src={`http://127.0.0.1:8000${f.image}`} className='card-img-top' alt="image" style={{ height: "200px" }} />
                                        {/* <i className='fas fa-heart position-absolute rounded shadow-lg top-0 end-0 m-2 text-danger' style={{cursor:'pointer',fontSize:'20px',backgroundColor:'white',padding:'5px'}}></i> */}
                                    </div>
                                    
                                    <div className="card-body">
                                        <div className="card-title">
                                            <Link to={'#'}>{f.item_name}</Link>
                                        </div>
                                        <p className="card-text text-muted">
                                            {f.item_description.slice(0, 40) + "........"}
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


                <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-center align-items-center gap-2 flex-wrap">

                        <button className="btn btn-outline-primary rounded-pill px-3"
                        onClick={()=>setCurrentPage(1)}
                        >
                            <i className="bi bi-chevron-double-left me-1"></i>
                            First
                        </button>

                        <button className="btn btn-outline-secondary rounded-pill px-3"
                        disabled={currentPage >1 ? false : true}
                        onClick={()=>setCurrentPage(currentPage-1)}
                        >
                            <i className="bi bi-chevron-left me-1"></i>
                            Previous
                        </button>

                        <button className="btn btn-primary rounded-pill px-4 shadow-sm"
                        disabled={currentPage === totalPage ? true : false}
                         onClick={()=>setCurrentPage(currentPage+1)}
                        >
                            Next
                            <i className="bi bi-chevron-right ms-1"></i>
                        </button>

                        <button className="btn btn-outline-primary rounded-pill px-3"
                        onClick={()=>setCurrentPage(totalPage)}
                        >
                            Last
                            <i className="bi bi-chevron-double-right ms-1"></i>
                        </button>

                        <span>Page {currentPage} of {totalPage}</span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default FoodMenu
