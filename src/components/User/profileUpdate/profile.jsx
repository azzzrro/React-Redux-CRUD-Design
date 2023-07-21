import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserUpdateAction} from '../../../services/redux/action/userUpdate'
import './profile.css'

import React from 'react'

function Profile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const user = useSelector((state) => state.UserUpdate)

    const APIURL = useSelector((state) => state.APIURL.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        axios.get(`${APIURL}/profile`, {
            params: { email: userEmail },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
        })
        .then((response) => {
                // Update the redux store with the user data fetched from the API
                dispatch(UserUpdateAction('username', response.data.username));
                dispatch(UserUpdateAction('email', response.data.email));
                dispatch(UserUpdateAction('mobile', response.data.mobile));
                dispatch(UserUpdateAction('image', response.data.image));
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message);
            });
    }, [APIURL, dispatch]);
  return (
    <div>

    </div>
  )
}

export default Profile

