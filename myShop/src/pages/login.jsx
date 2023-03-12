import React, { useState, useContext } from 'react';
import { FormTemplate } from '../components/formTemplate';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { SessionContext } from '../../context/sessionContext';

export function Login() {

    const [dataConnect, setDataConnect] = useState({
      Email: '',
      Password: ''
    });

    const session = useContext(SessionContext); 
  
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const tokenResponse = await axios.post('http://localhost:3000/api/user/connect', dataConnect);
          session.token = tokenResponse.data.token;
          session.Email = dataConnect.Email;
          const responseSession = await axios.get(`http://localhost:3000/api/user/${session.Email}`);
          session.userId = responseSession.data.id.toString();
          session.userName = responseSession.data.Name;
          session.userAddress = responseSession.data.Address;
          session.userAdmin = responseSession.data.Admin;
          session.userSurname = responseSession.data.Surname;
          navigate('/home', session.token);
        }
        catch (error) {
          console.log(error);
          navigate('/error');
        }
      };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDataConnect((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <>
          <div id="login-content">
          <img src="../asset/logo.png" className="login-logo"></img>
          <FormTemplate handleSubmit={handleSubmit}>
            <input
              className='LoginFormEmail'
              type="email"
              name="Email"
              placeholder="Entrez votre courriel."
              value={dataConnect.Email}
              onChange={handleInputChange}
              required
            />
            <input
            className='LoginFormPassword'
              type="password"
              name="Password"
              placeholder="Entrez votre mot de passe."
              value={dataConnect.Password}
              onChange={handleInputChange}
              required
            />
            <button className="LoginFormValidator" type="submit">Se connecter</button>
          </FormTemplate>
          </div>
          <span className='redirection-inscription'>Vous n'avez pas de compte ? <Link to="/" style={{textDecoration:'none'}}>S'inscrire.</Link></span>
        </>
      );
}