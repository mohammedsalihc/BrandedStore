import React, { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../config/config'

function Products() {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const response = await fetch(`${SERVER_URL}/getproducts`)
            if (componentMounted) {
                setData(await response.clone().json())
                setFilter(await response.json())
                setLoading(false)
            }

            return () => {
                componentMounted = false
            }
        }
        getProducts()
    }, [])

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        )
    }

    const filterProduct = (brand) => {
        const updatedList = data.filter((x) => x.brand === brand)
        setFilter(updatedList)

    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <Button onClick={() => setFilter(data)} variant="outline-dark me-2">All Brands</Button>
                    <Button onClick={() => filterProduct("GUCCI")} variant="outline-dark me-2">GUCCI</Button>
                    <Button onClick={() => filterProduct("BALR")} variant="outline-dark me-2">BALR</Button>
                    <Button onClick={() => filterProduct("H&M")} variant="outline-dark me-2">H&M</Button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4" >
                                <div className="card h-100 text-center p-4" key={product._id} >
                                    <Link to={`/products/${product._id}`}><img src={product.image} height="250px" className="card-img-top" alt={product.name} /></Link>
                                    <div className="card-body">
                                        <Link className='text-decoration-none text-dark' to={`/products/${product._id}`}>
                                            <h5 className="card-title mb-0 ">{product.name}</h5>
                                        </Link>
                                        <p className="card-text lead ">{product.brand}</p>
                                        <p className="card-text lead fw-bolder">${product.price}</p>
                                        <Link to={`/products/${product._id}`}><Button variant="outline-dark">Buy Now</Button></Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
                }
            </>
        )
    }


    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Products