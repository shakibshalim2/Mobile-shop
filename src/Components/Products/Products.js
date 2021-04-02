import React from 'react';
import { Link } from 'react-router-dom';
import css from './Products.css'
const Products = (props) => {
    const { name, img, _id, price } = props.products;

    return (
        <div className="col-md-4 mb-5 box-shadow">
            <div className='shadow-none p-4 mb-5 bg-light rounded mobile-info'>
                <img className="img-fluid w-50" src={img} alt="" />
                <h3 className="mobile-name">{name}</h3>
                <div className='box d-flex'>
                    <h4 className='price'>{price}</h4>
                    <Link style={{ textDecoration: 'none' }} to={`/product/${_id}`} className='button'>Buy Now</Link>
                </div>

            </div>

        </div>
    );
};

export default Products;