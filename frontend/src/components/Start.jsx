import './Start.css';
import './Background.scss';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Start(props) {
  return (
    <>
      <div className="gradient"></div>
      <form className="corpoForm">
        <h2 className="my-5">Insira seus dados!</h2>
        <div className="input-group my-4 campoDigitar">
          <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
          <input id="nome-input" type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group my-4 campoDigitar">
          <span className="input-group-text" id="basic-addon1">@</span>
          <input id="email-input" type="text" className="form-control" placeholder="E-mail" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="botoes">
          <button className="btn btn-success">Confirmar</button>
          <button className="btn btn-danger">Cancelar</button>
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