import React from 'react'
import './adminLogin.css'

function Login() {
  return (
    <div>
        <div className='admin-container'>
            <div className='admin-login-form'>
                <h1>Admin Login</h1>
                <form action="">
                    <div>
                    <input type="text" 
                    className='input'
                    placeholder='Enter your name'
                    />
                    </div>
                    <div>
                    <input type="text" 
                    className='input'
                    placeholder='Enter your password'
                    />
                    </div>
                    <button>LogIn</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login

