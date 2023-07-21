import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { UserLoginAction } from '../../../services/redux/action/userLogin'
import axios from '../../../services/axios/axios'


function Login() {

    const login = useSelector((state) => state.UserLogin)
    const APIURL = useSelector((state) => state.APIURL.url);

    const queryParams = {
        email: login.email,
        password: login.password,
      };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          console.log(token);
        }else{
            console.log("nothing");
        }
      });


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        dispatch(UserLoginAction(e.target.name, e.target.value))
    }



    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${APIURL}/login`,{ params: queryParams })
            if (response.data.userData && response.data.userData.email) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userEmail', response.data.userData.email);
                navigate('/home')
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }



    return (
        <div>
            <div className='login-container'>
                <div className='login-form'>
                    <div className="login">
                        <h1>Welcome back!</h1>
                        <form onSubmit={handleLogin} >
                            <div>
                                <input 
                                    type="text"
                                    className='input'
                                    name='email'
                                    placeholder='Enter your email'
                                    value={login.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input type="text"
                                    className='input'
                                    name='password'
                                    placeholder='Enter your password'
                                    value={login.password}
                                    onChange={onChange}
                                />
                            </div>
                            <button>LogIn</button>
                        </form>
                        <div className='login-footer'>
                            <p>Not yet registered?</p>
                            <p className='signup-p'
                                onClick={() => {
                                    navigate('/signup')
                                }}
                            >Signup here!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login