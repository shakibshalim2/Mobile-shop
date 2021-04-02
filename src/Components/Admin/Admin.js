import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import css from './Admin.css'
const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const { submit, setSubmit } = useState()
    const [img, setImage] = useState(null)
    const onSubmit = data => {
        console.log(data);
        const eventData = {
            name: data.name,
            img: img,
            price: data.price
        };
        const url = `https://guarded-badlands-83003.herokuapp.com/addProduct`
        console.log(eventData)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server side'))

    };
    const handleImgUpload = event => {
        console.log(event.target.files);
        const imageData = new FormData()
        imageData.set('key', 'b35c2202361fc0aea49f8e648e2cdc53');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImage(response.data.data.display_url)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className='container text-center form'>
            <form className='form-data' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' name="name" defaultValue="samsung j5" ref={register} />
                <br />
                <input className='mb-2' name="price" defaultValue="$200" ref={register({ required: true })} />
                <br />
                <input className='mt-3 image-field' name="exampleRequired" type="file" onChange={handleImgUpload} />
                <br />
                {
                    img ? <p className='mt-4'>Image Upload Success click submit</p> : null
                }
                <input className='mt-4' type="submit" />
            </form>
        </div>
    );
};

export default Admin;