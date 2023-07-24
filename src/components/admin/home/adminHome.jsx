import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserUpdateAction } from '../../../services/redux/action/userUpdate';
import "./adminHome.css";

function AdminHome() {

    const APIURL = useSelector((state) => state.APIURL.url);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteUser = async (userId) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {

                const userData = await axios.delete(`${APIURL}/admin/deleteUser/${userId}`, userId);
                if(userData.data.email){
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
                }else{
                    alert(userData.data.message)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addUser = () => {
        navigate('/admin-addUser')
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIURL}/admin/loadDashboard`);
                setUsers(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();

    }, [APIURL]);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const logout = () => {
        localStorage.clear()
        navigate('/admin')
    }

    return (
        <div className="table-container">
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Users</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <input type="search"
                                        placeholder='Search Users'
                                        name=""
                                        id=""
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <a onClick={logout} href="#addEmployeeModal" className="btn btn-danger" data-toggle="modal">
                                        <i className="material-icons">&#xe9ba;</i> <span>Logout</span>
                                    </a>
                                    <a onClick={addUser} href="#addEmployeeModal" className="btn btn-success" data-toggle="modal">
                                        <i className="material-icons">&#xE147;</i> <span>Add New User</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Joining Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((users)=>(
                                    <tr key={users._id}>
                                    <td>{users.username}</td>
                                    <td>{users.email}</td>
                                    <td>{users.mobile}</td>
                                    <td>{users.date}</td>
                                    <td>
                                            <i onClick={()=>{
                                                dispatch(UserUpdateAction(users._id))
                                                navigate(`/admin-update?id=${users._id}`)
                                            }} className="edit material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>

                                            <i onClick={()=>deleteUser(users._id)} 
                                            style={{color:"red"}} className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </td>
                                </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            

        </div>
    );
}

export default AdminHome;
