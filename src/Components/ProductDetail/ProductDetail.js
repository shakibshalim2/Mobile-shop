

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import css from './ProductDetail.css'



const ProductDetail = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
    })
    useEffect(() => {
        const url = `https://guarded-badlands-83003.herokuapp.com/products/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate, ...product }
        delete newBooking._id
        fetch('https://guarded-badlands-83003.herokuapp.com/addBooking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)

        })
            .then(res => res.json())
            .then(data => console.log(data))
    }



    return (
        <div className='container cart-item'>
            <h3>Checkout</h3>

            <div className="row no-gutters py-2 cart-body">

                <div className="col-sm-2 col-md-2 p-2">
                    <img
                        alt={product.name}
                        style={{ margin: "0 auto", maxHeight: "50px" }}
                        src={product.img} className="img-fluid d-block" />
                    <div className='price-bg'>
                        <p className='total-price'>Total</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-4 p-2">
                    <h5 className="mb-1">{product.name}</h5>
                </div>
                <div className="col-sm-2 col-md-2 p-2 text-center ">
                    <p className="mb-0">Qty: 1</p>
                </div>
                <div className="col-sm-4 col-md-4 p-2">
                    <p className="mb-1">Price: {product.price} </p>
                    <div>
                        <p className='price'>{product.price}</p>
                    </div>
                </div>
            </div>
            <div className="btn">
                <Link to="/orders" onClick={handleBooking} className="btn  btn-sm link-button ">Checkout</Link>
            </div>
        </div>

    );
};

export default ProductDetail;