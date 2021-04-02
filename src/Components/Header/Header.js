import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './Header.css';
import icon from '../../media/icons/Avatar face.png'
import { UserContext } from '../../App';
const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    const { name } = loggedInUser;



    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <h1 className="navbar-brand website-name">Mobile Shop</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav-style navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link className="nav-link active" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link className="nav-link active" to="/admin">Admin</Link>
                        </li>
                        <li className="nav-item ml-2">
                            <Link className="nav-link active" to="/deals">Deals</Link>
                        </li>
                        <li className="nav-item ml-4 ">
                            {
                                name ?
                                    <h4 className="name">{name}</h4> : <div className='mt-2'><Link style={{ textDecoration: 'none' }} to="/login" className="login-btn">Login</Link></div>
                            }
                        </li>
                    </ul>

                </div>
            </div>
        </nav >
    );
};

export default Header;