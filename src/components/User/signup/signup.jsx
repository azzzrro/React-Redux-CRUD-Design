import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./signup.css";
import axios from "../../../services/axios/axios";
import {UserSignupAction} from '../../../services/redux/action/userSignup'

function Signup() {
    const [image, setImage] = useState(null);
    const [viewImage, setViewImage] = useState(null);


    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setViewImage(URL.createObjectURL(image));
    };

    const signup = useSelector((state) => state.UserSignup);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        dispatch(UserSignupAction(e.target.name, e.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", signup.username);
            formData.append("email", signup.email);
            formData.append("mobile", signup.mobile);
            formData.append("password", signup.password);
            formData.append("image", image);
            const response = await axios.post(`/register`, formData);
            if (response.status === 201) {
                navigate("/");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup">
                        <div className="heading">
                            <h1>Signup Now</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    name="username"
                                    placeholder="Enter your name"
                                    required
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
                                    required
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
                                    required
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
                                    required
                                    value={signup.password}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {image?"Choose another photo":"Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="image"
                                    id="fileInput"
                                    required
                                    onChange={handleImageChange}
                                    style={{display: "none"}}
                                />
                            </div>
                            <div>
                                {image && (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={viewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )}
                            </div>
                            <button>Signup Now</button>
                        </form>
                        <p>
                            Already registered?{" "}
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Login here
                            </span>
                        </p>
                    </div>
                    <div className="signup-image">
                        <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1689949881~exp=1689950481~hmac=58560ad660e25612b606680a6bdc8653304832d1d1ecc9a86b0857d6dee6af83" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
