import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';

const Home = () => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        fetch('https://guarded-badlands-83003.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [])

    return (
        <div className="container">

            <div className='text-center'>
                {

                    products.length === 0 && <CircularProgress />
                }
            </div>
            <div className="row text-center">


                {

                    products.map(products => <Products products={products}> </Products>)


                }
            </div>
        </div>
    );
};

export default Home;