import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../../context/sessionContext";

export function MonPanier(){
    const session = useContext(SessionContext);
    const [monPanierData, setMonPanierData] = useState({
        id: '',
        ArticleId: '',
        CommandeId:'',
        Quantity:''
      });

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3000/api/user/commande/monPanier', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                }, 
                params: {
                    'token': `${session.token}`,
                    'userId': `${session.userId}`
                }
            });
            setMonPanierData(response.data);
        }
        fetchData();
    }, []);
    session.PanierId = `${monPanierData.id}`;
    console.log(session);
    console.log('Objet session');
    return (
        <div>
            <p>Voilà voile le contenu de votre panier.</p>
            <p>Voila vos données personnelles modifiables si vous voulez</p>
            <p>Continuez votre Shopping ? </p>
            <p>Validez votre panier ?</p>
        </div>
    );
}

