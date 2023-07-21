import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./signup.css";
import axios from "../../../services/axios/axios";
import {UserSignupAction} from '../../../services/redux/action/userSignup'

function Signup() {
    // const [username, setUserName] = useState("");
    // const [email, setEmail] = useState("");
    // const [mobile, setMobile] = useState("");
    // const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [viewImage, setViewImage] = useState(null);


    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setViewImage(URL.createObjectURL(image));
    };

    const signup = useSelector((state) => state.UserSignup);
    const APIURL = useSelector((state) => state.APIURL.url);
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
                                    {image?"Choose another photo":"Select a profile Photo"}
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
                                {image && (
                                    <img
                                        style={{ width: "250px", height: "100px", margin: "5px 0 15px 0" }}
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
                </div>
            </div>
        </div>
    );
}

export default Signup;
