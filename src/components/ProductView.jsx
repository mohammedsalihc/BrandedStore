import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Rating from './Rating';
import { SERVER_URL } from '../config/config';



function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`${SERVER_URL}/getproduct/${id}`)
            setProduct(await response.json())
            setLoading(false)
        }
        getProduct()
    }, [])

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />

                </div>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6 ">
                    <img src={product.image} alt={product.name} height={400} width={400} />
                </div>
                <div className="col-md-6">
                    <h1 className='display-5'>{product.name}</h1>
                    <h4 className='text-uppercase text-black-50'>{product.brand}</h4>
                    {<Rating rating={product.rating} />}
                    <h3 className='display-6 fw-bold my-4'>${product.price}</h3>
                    <p className='lead'>{product.description}</p>
                    <Button variant="outline-dark px-4 py-2">Add to cart</Button>
                    <Link to="/cart"><Button variant="dark ms-2 px-3 py-2">Go to cart</Button></Link>
                </div>
            </>
        )
    }



    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}

export default ProductView