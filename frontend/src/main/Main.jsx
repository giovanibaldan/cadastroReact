import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import 'font-awesome/css/font-awesome.min.css'
import './Main.css'; // Seu CSS personalizado
import Login from '../components/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Login />
);