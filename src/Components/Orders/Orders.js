import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Checkout from '../CheckoutPage/Checkout';

const Orders = () => {
    const [bookings, setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch('https://guarded-badlands-83003.herokuapp.com/bookings?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setBookings(data))

    }, [])
    return (
        <div className="container">
            {
                bookings.map(book => <Checkout book={book}></Checkout>)

            }

        </div>
    );
};

export default Orders;