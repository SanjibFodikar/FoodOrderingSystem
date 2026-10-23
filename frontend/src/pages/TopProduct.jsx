import React, { useState, useEffect } from 'react'

const TopProduct = () => {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/top_selling_foods/')
            .then(a => a.json())
            .then(data => {
                console.log(data)
                setFoods(data)
            })

    }, [])
    return (
        <div className='card p-3'>
            <div className="card-header bg-success text-white">
                <i className='fa fa-star me-2'></i>Top Selling Foods
            </div>

            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food Item</th>
                            <th>Total Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((f,index)=>{
                         return <tr key={index}>
                             <td>{index+1}</td>
                             <td>{f.food__item_name}</td>
                             <td>{f.total_sold}</td>
                          </tr>
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        
    )
}

export default TopProduct
