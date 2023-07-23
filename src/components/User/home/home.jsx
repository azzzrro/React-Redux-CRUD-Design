import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../home/home.css'
import axios from 'axios'
import { useSelector } from 'react-redux'


function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const APIURL = useSelector(state => state.APIURL.url)

  const Logout = (() => {
    localStorage.clear();
    navigate('/')
  })

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    axios.get(`${APIURL}/profile`, {
      params: { email: userEmail },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      console.log(response);
      setData(response.data)
    }).catch((error) => {
      console.error(error.message);
    })
  }, [APIURL])

  return (
    <div className='main'>
      <div className="navbar">
        <div className="navbar-brand">
          <h3>User Profile</h3>
        </div>
        <nav className="navbar-nav">
          {data.email ?
            <div onClick={Logout} className="nav-item">
              <p>Logout</p>
            </div>

            :
            <>
              <div className="nav-item">
                Login
              </div>
              <div className="nav-item">
                Signup
              </div>
            </>

          }
        </nav>
      </div>

      <div className='container'>



        {data.email &&
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className="image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                  <img src={`${APIURL}/public/images/${data.image}`} alt={data.image} />
                </button>
                <span className="name mt-3">{data.username}</span>
                <span className="idd">{data.email}</span>
                {/* <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span>
              <i className="fa fa-copy"></i>
            </span>
          </div> */}
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                  <span className="number">
                    {data.mobile}
                  </span>
                </div>
                <div className="d-flex mt-2">
                  <button onClick={(() => { navigate('/profile-update') })} className="btn1 btn-dark">Edit Profile</button>
                </div>

                <div className="text-center mt-3">
                  <span>Joining Date : {data.date}</span>
                </div>



                <div className='d-flex'>
                  <div className="d-flex mt-4">
                    <button onClick={Logout} className="btn2 btn-dark">Logout</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default Home