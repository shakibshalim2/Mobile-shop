import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import css from './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import icon from '../../media/icons/google.png'

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory()
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser)
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });

    }
    const handleBlur = (e) => {
        let isFiledValid = true;
        if (e.target.name === 'email') {
            isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFiledValid = isPasswordValid && passwordHasNumber;
        }
        if (isFiledValid) {
            const newUserInfo = { ...loggedInUser }
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo)
                    updateUserName(loggedInUser.name)
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo)
                });
        }
        if (!newUser && loggedInUser.email && loggedInUser.password)
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                })
                .catch((error) => {
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo)
                });
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
    }




    return (
        <div className='login-page w-25'>
            <div className='mb-4'>
                <div className='form-style w-100'>
                    <h1>Sign up or Sign in</h1>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser" />
                    <label htmlFor="newUser">New user sign up</label>
                    <form onSubmit={handleSubmit}>
                        {newUser && < input className='w-50' name='name' type="text" onBlur={handleBlur} placeholder='Your Name' />}
                        <br />
                        <input className='w-50' type="text" name="email" onBlur={handleBlur} placeholder='write your email address' required />
                        <br />
                        <input className='w-50' type="password" name="password" onBlur={handleBlur} placeholder='your password' required />
                        <br />
                        {newUser ?
                            <small> password must have 6 digit letter and minimum one numeric</small> : null}
                        <br />
                        <input className='w-25' type="submit" value={newUser ? 'sign up' : 'sign in'} />
                        <br />
                        <h5>or</h5>
                    </form>
                    <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                    {
                        loggedInUser.success && <p style={{ color: 'green' }}> user {newUser ? 'created' : 'Logged In'} successfully</p>

                    }
                </div>
                <div className='google-icon'>
                    <button style={{ marginBottom: '5%' }} onClick={handleGoogleSignIn}> <img style={{ width: '25%' }} src={icon} alt="" /> </button>
                </div>
            </div>

        </div>
    );
};
export default Login;