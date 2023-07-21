import React from "react";
import "./adminHome.css";

function AdminHome() {
    return (
        <div className="table-container">
            <div className="row w-75">
                <table>
                    <thead>
                        <tr>
                            <th>one</th>
                            <th>two</th>
                            <th>Three</th>
                            <th>four</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>one data</td>
                            <td>two data</td>
                            <td>three data</td>
                            <td>four data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
