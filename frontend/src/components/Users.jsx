import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Users.css";
import "./Background.scss";
import Footer from "./Footer";
import IconReturn from '../assets/return-icon.png';

function Users() {
    const [users, setUsers] = useState([]);

    // GET inicio
    useEffect(() => {
        fetch('http://localhost:3333/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    function renderTable() {
        return users.map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                    <button className="edit-button">
                        <span className="fa fa-pencil"></span>
                    </button>
                </td>
                <td>
                    <button className="delete-button">
                        <span className="fa fa-trash"></span>
                    </button>
                </td>
            </tr>
        ));
    }
    // GET fim

    return (
        <>
            <div className="gradient"></div>
            <Link to='/'><img src={IconReturn} alt="Ícone GitHub" className='iconReturn' /> </Link>
            <table className="corpoDados">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>E-MAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
            <Footer />
        </>
    );
}

export default Users;
