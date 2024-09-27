import './Start.css';
import './Background.scss';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Start(props) {

  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  function createUser(e) {
    e.preventDefault();

    if (nome === '' || email === '') {
      alert("Preencha todos os campos!");
      return;
    }

    const lastUserId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
    const newId = lastUserId + 1;

    const newUser = {
      id: newId.toString(),
      nome: nome,
      email: email
    };

    fetch('http://localhost:3333/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(user => {
        setUsers([...users, user]);
        setNome('');
        setEmail('');
        alert("Dados cadastrados com sucesso!")
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  }

  return (
    <>  
      <div className="gradient"></div>
      <form className="corpoForm">
        <h2 className="my-5">Insira seus dados!</h2>

        <div className="input-group my-4 campoDigitar">
          <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
          <input id="nome-input" type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"
            value={nome}
            onChange={e => setNome(e.target.value)} />
        </div>

        <div className="input-group my-4 campoDigitar">
          <span className="input-group-text" id="basic-addon1">@</span>
          <input id="email-input" type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="botoes">
          <button className="btn btn-success" onClick={createUser}>Confirmar</button>
          <button className="btn btn-danger" onClick={() => { setNome(''); setEmail(''); }}>Cancelar</button>
        </div>

        <div className="center-button">
          <Link className='link btn btn-warning' to='/users'>Ver Dados</Link>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Start;
