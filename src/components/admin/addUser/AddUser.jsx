import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { UserSignupAction } from '../../../services/redux/action/userSignup';
import './AddUser.css'


function AddUser() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
        setPreviewImage(URL.createObjectURL(image));
      };

    const signup = useSelector((state) => state.UserSignup);
    const APIURL = useSelector((state) => state.APIURL.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        dispatch(UserSignupAction(e.target.name, e.target.value));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('username', signup.username);
          formData.append('email', signup.email);
          formData.append('mobile', signup.mobile);
          formData.append('password', signup.password);
          formData.append('image', selectedImage);
          const response = await axios.post(`${APIURL}/register`, formData);
          if (response.status === 201) {
            navigate('/dashboard');
          } else {
            alert(response.data.message,"responsee");
          }
        } catch (error) {
          console.log(error);
          alert(error.message+"trycatchh");
        }
      };

  return (
    <div className='admin-main'>
            <div className="admin-update-container">
                <div className="admin-addUser-form">
                    <div className="admin-update">
                        <div className="heading">
                            <h1>Add User</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={signup.username}
                                    onChange={onChange}
                                   
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={signup.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="mobile"
                                    placeholder="Enter your number"
                                    value={signup.mobile}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    name="password"
                                    placeholder="Create a password"
                                    value={signup.password}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {selectedImage?"Choose another photo":"Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="image"
                                    id="fileInput"
                                    onChange={handleImageChange}
                                    style={{display: "none"}}
                                />
                            </div>
                            <div>
                                {selectedImage && (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={previewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )}
                            </div>
                            <button>Add User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddUser