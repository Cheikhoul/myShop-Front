import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../../context/sessionContext";
import { FormTemplate } from "../components/formTemplate";
import { Link, useNavigate } from "react-router-dom";

export function MonPanier(){
    const session = useContext(SessionContext);
    const [monPanierData, setMonPanierData] = useState({
        id: '', 
        UserId: '',
        Status: ''
    });
    const navigate = useNavigate();

    
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3000/api/user/commande/monPanier', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                }, 
                params: {
                    'token': `${session.token}`,
                    'userId': session.userId
                }
            });
            setMonPanierData(response.data);
        }
        fetchData();
    }, monPanierData);
    session.PanierId = monPanierData.id;
    console.log(session);
    console.log('Objet session');

    const handleSubmitValiderPanier = async (event) => {
        event.preventDefault();
        try {
            const responseValidation = await axios.put('http://localhost:3000/api/user/valider-panier', {
                'token': `${session.token}`,
                'userId': session.userId,
                'panierId': session.PanierId
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.token}`
                    }
                });
            console.log(responseValidation.data);
            session.PanierId = responseValidation.data.id;
            navigate('/commande/monPanier', session);
        }
        catch (error) {
          console.log(error);
          navigate('/error');
        }
      };
    return (
        <div>
            <p>Voilà voile le contenu de votre panier.</p>
            <p>Voila vos données personnelles modifiables si vous voulez</p>
            <FormTemplate handleSubmit={handleSubmitValiderPanier}>
                <button type="submit" className="FormCommandeValidator">Validez mon panier</button>
            </FormTemplate>
            <br/>
            <Link to="/home" style={{textDecoration:'none'}}><button className="RetourAccueil">Continuez mon Shopping</button></Link>

        </div>
    );
}

