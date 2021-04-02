import React from 'react';
import css from './Checkout.css'

const Checkout = ({ book }) => {
    return (
        <div>
            <h4 className='orders-text'>Your Order</h4>
            <div className='row order-page-style mb-5'>
                <div className='col-md-6'>
                    <img className='img-fluid w-25 mt-3 img-style' src={book.img} alt="" />
                </div>
                <div className='col-md-6 mt-2'>
                    <p>{book.name}</p>
                    <p>{book.email}</p>
                    <p>{(new Date(book.checkIn).toDateString('dd/MM/yyyy'))}</p>
                    <p>{book.price}</p>
                </div>

            </div>
        </div>
    );
};

export default Checkout;