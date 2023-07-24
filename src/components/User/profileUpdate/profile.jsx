import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserUpdateAction } from '../../../services/redux/action/userUpdate'
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


    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };


    const onChange = (e) => {
        dispatch(UserUpdateAction(e.target.name, e.target.value));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('mobile', user.mobile);
            const oldEmail = localStorage.getItem('userEmail')
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            const response = await axios.patch(`${APIURL}/profile-update`, formData, { headers, params: { userEmail: oldEmail } });
            if (response.data.email) {
                navigate('/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    const Logout = ()=>{
        localStorage.clear()
        navigate('/')
    }




    return (
        <div className='main'>

            <div className="navbar">
                <div className="navbar-brand">
                    <h3>User Profile</h3>
                </div>
                <nav className="navbar-nav">
                        <div onClick={Logout} className="nav-item">
                            <p>Logout</p>
                        </div>
                </nav>
            </div>

            <div className="user-update-container">
                <div className="update-form">
                    <div className="update">
                        <div className="heading">
                            <h1>Update Profile</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={user.username}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={user.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="mobile"
                                    placeholder="Enter your number"
                                    value={user.mobile}
                                    onChange={onChange}
                                />
                            </div>
                            {/* <div>
                                <input
                                    type="password"
                                    className="input"
                                    name="password"
                                    placeholder="Create a password"
                                    value={signup.password}
                                    onChange={onChange}
                                />
                            </div> */}

                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {user.image || previewImage ? "Choose another photo" : "Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="image"
                                    id="fileInput"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div>
                                {previewImage ? (
                                    <img
                                        style={{ width: "250px", height: "100px", margin: "5px 0 15px 0" }}
                                        src={previewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : user && user.image ? (
                                    <img
                                        style={{ width: "250px", height: "100px", margin: "5px 0 15px 0" }}
                                        src={`${APIURL}/public/images/${user.image}`}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : (
                                    <img
                                        style={{ width: "250px", height: "100px", margin: "5px 0 15px 0" }}
                                        src=""
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )

                                }
                            </div>
                            <button>Update Profile</button>
                        </form>
                        {/* <p>
                            Already registered?{" "}
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Login here
                            </span>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

