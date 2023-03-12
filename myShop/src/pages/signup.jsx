import React, { useState, useContext } from 'react';
import { FormTemplate } from '../components/formTemplate';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { SessionContext } from '../../context/sessionContext';

export function Signup() {
  const [formData, setFormData] = useState({
    Name: '',
    Surname: '',
    Email: '',
    Password: '',
    Admin: 'false', 
    Address: ''
  });
  const [dataConnect, setDataConnect] = useState({
    Email: '',
    Password: ''
  });
  const session = useContext(SessionContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user', formData);
      console.log(response);
      session.Email = formData.Email
      session.userName = formData.Name;
      session.userAddress = formData.Address;
      session.userAdmin = formData.Admin;
      session.userSurname = formData.Surname;
      navigate('/commande/monPanier')
    } catch (error) {
      console.log(error.response); 
      navigate('/error');
    }
    try {
      dataConnect.Email = formData.Email;
      dataConnect.Password = formData.Password;
      const token = await axios.post('http://localhost:3000/api/user/connect', dataConnect);
      session.token = token.data.token;
      const responseSession = await axios.get(`http://localhost:3000/api/user/${session.Email}`);
      session.userId = responseSession.data.id.toString();
      navigate('/home', token);
    }
    catch (error) {
      navigate('/error');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div id="user-creation-form">
      <img src="../asset/logo.png" className="login-logo"></img>
      <FormTemplate handleSubmit={handleSubmit}>
        <input
          className='FormFirstname'
          type="text"
          name="Name"
          placeholder="Entrez votre prénom."
          value={formData.Name}
          onChange={handleInputChange}
          required
        />
        <input
          className='FormLastname'
          type="text"
          name="Surname"
          placeholder="Entrez votre nom."
          value={formData.Surname}
          onChange={handleInputChange}
          required
        />
        <input
          className='FormEmail'
          type="email"
          name="Email"
          placeholder="Entrez votre courriel."
          value={formData.Email}
          onChange={handleInputChange}
          required
        />
        <input
        className='FormPassword'
          type="password"
          name="Password"
          placeholder="Créez votre mot de passe."
          value={formData.Password}
          onChange={handleInputChange}
          required
        />
        <label className='FormAdminLabel'>Admin :  </label>
        <input
          className='FormAdmin'
          type="checkbox"
          name="Admin"
          value= {formData.Admin} // Set the initial value of Admin
          checked={formData.Admin === "true"}
          onChange={(e) => {
            const newValue = e.target.checked ? "true" : "false"; // Set the new value of Admin
            setFormData({ ...formData, Admin: newValue });
          }}
        />
        <input
          className='FormAddress'
          type="text"
          name="Address"
          placeholder="Entrez votre adresse."
          value={formData.Address}
          onChange={handleInputChange}
          required
        />
        <button className="FormValidator" type="submit">S'inscrire</button>
      </FormTemplate>
      </div>
      <span className='redirection-connexion'>Vous avez déjà un compte ? <Link to="/login" style={{textDecoration:'none'}}>Connectez vous.</Link></span>
    </>
  );
}

