import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Users.css";
import "./Background.scss";
import Footer from "./Footer";
import IconReturn from '../assets/return-icon.png';

function Users() {
    const [users, setUsers] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [userEdit, setUserEdit] = useState(null);
    const [userDelete, setUserDelete] = useState(null)

    // GET Inicio
    useEffect(() => {
        fetch('http://localhost:3333/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Fetch error:', error));
    }, [users]);

    function renderTable() {
        return users.map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                    <button className="edit-button" onClick={() => openPut(user)}>
                        <span className="fa fa-pencil"></span>
                        <span className="fa fa-pen"></span>
                    </button>
                </td>
                <td>
                    <button className="delete-button" onClick={() => openDelete(user)}>
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

    // DELETE Inicio

    function openDelete(user) {
        setUserDelete(user)
        setNome(user.nome);
        setEmail(user.email);
    }

    function closeDelete() {
        setUserDelete(null)
    }

    function deleteUser() {
        if (!userDelete) return;

        fetch(`http://localhost:3333/users/${userDelete.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json)
            .then(data => {
                console.log(data)
                closeDelete()
            })
    }
    // DELETE Fim

    return (
        <>
            <div className={`telaPreta ${userEdit ? 'visible' : ''}`} onClick={closePut}></div>
            <div className={`telaPreta ${userDelete ? 'visible' : ''}`} onClick={closeDelete}></div>

            <div className="gradient"></div>

            <Link to='/'><img src={IconReturn} alt="Ícone GitHub" className='iconReturn' /> </Link>

            <table className="corpoDados">
                <thead>
                    <tr>
                        <th className='idTHead'>ID</th>
                        <th>NOME</th>
                        <th>E-MAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>

            {userDelete && (
                <div className='openDelete' style={{ visibility: 'visible' }}>

                    <p className='tituloMetodo'>Deletar Usuário</p>

                    <div className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
                        <input id="nome-input" type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"
                            value={nome}
                            onChange={() => { }}
                            disabled
                        />
                    </div>

                    <div className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input id="email-input" type="text" className="form-control" placeholder="E-mail" aria-label="Username" aria-describedby="basic-addon1"
                            value={email}
                            onChange={() => { }}
                            disabled
                        />
                    </div>

                    <div className="botoesMetodo">
                        <button className="btn btn-danger" onClick={deleteUser}>Deletar</button>
                        <button className="btn btn-success" onClick={closeDelete}>Cancelar</button>
                    </div>

                </div>
            )}

            {userEdit && (
                <div className='openPut' style={{ visibility: 'visible' }}>

                    <p className='tituloMetodo'>Alterar Usuário</p>

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

                    <div className="botoesMetodo">
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
