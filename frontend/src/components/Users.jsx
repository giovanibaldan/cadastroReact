import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Users.css";
import "./Background.scss";
import Footer from "./Footer";
import IconReturn from '../assets/return-icon.png';

function Users() {
    const [users, setUsers] = useState([]);
    const [userEdit, setUserEdit] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    // GET Inicio
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
                    <button className="edit-button" onClick={() => openPut(user)}>
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
    // GET Fim

    // PUT Inicio
    function openPut(user) {
        setUserEdit(user);
        setNome(user.nome);
        setEmail(user.email);
    }

    function closePut() {
        setUserEdit(null);
    }

    function editUser() {
        if (!userEdit) return;

        fetch(`http://localhost:3333/users/${userEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        })
            .then(response => response.json())
            .then(updatedUser => {
                setUsers(users.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                ));
                closePut();
            })
            .catch(error => console.error('Update error:', error));
    }
    // PUT Fim

    return (
        <>
            <div className={`telaPreta ${userEdit ? 'visible' : ''}`} onClick={closePut}></div>

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

            {userEdit && (
                <div className='openPut' style={{ visibility: 'visible' }}>

                    <div className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
                        <input id="nome-input" type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>

                    <div className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input id="email-input" type="text" className="form-control" placeholder="E-mail" aria-label="Username" aria-describedby="basic-addon1"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="botoesPut">
                        <button className="btn btn-success" onClick={editUser}>Confirmar</button>
                        <button className="btn btn-danger" onClick={closePut}>Cancelar</button>
                    </div>

                </div>
            )}

            <Footer />
        </>
    );
}

export default Users;
