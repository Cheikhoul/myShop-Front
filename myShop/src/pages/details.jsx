import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FormTemplate } from "../components/formTemplate";
import { SessionContext } from "../../context/sessionContext";

export function Details() {
    const [monArticle, setMonArticle] = useState([]);

    const articleParam = useParams();
    const session = useContext(SessionContext);
    const [dataLigneCommande, setDataLigneCommande] = useState({
        CommandeId: `${session.PanierId}`,
        ArticleId: `${articleParam.id}`,
        Quantity: '1'
      });

    const navigate = useNavigate();
    

    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`http://localhost:3000/api/article/${articleParam.id}`);
          setMonArticle(response.data);
          const sessionResponse = await axios.get('http://localhost:3000/api/user/commande/monPanier', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.token}`
              }, 
              params: {
                  'token': `${session.token}`,
                  'userId': `${session.userId}`
              }
          });
          session.PanierId = `${sessionResponse.data.id}`;
          setDataLigneCommande((prevState) => ({ ...prevState, CommandeId: sessionResponse.data.CommandeId }));
        }
      
        fetchData();
      }, []);
      

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const lineResponse = await axios.post('http://localhost:3000/api/user/addToPanier', {
                    'ArticleId':`${dataLigneCommande.ArticleId}`,
                    'CommandeId': `${session.PanierId}`,
                    'Quantity': `${dataLigneCommande.Quantity}`
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.token}`
                    }, 
                    params: {
                        'token': `${session.token}`,
                        'userId': `${session.userId}`
                    }
                });
            console.log(session);
            console.log('Ca a marché : l ajout a un panier.')
            navigate('/commande/MonPanier', session);
        }
        catch(error){
          console.log(error);
          console.log('ca a echoue : l ajout a un panier.')
          navigate('/error');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDataLigneCommande((prevState) => ({ ...prevState, [name]: value }));
    };
    
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../../asset/carouselImg1.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../asset/carouselImg1.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../asset/carouselImg1.png" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <h1>{monArticle.ArticleName}</h1>
            <div className="infos-supplementaires">
                <div className="article-description">
                    <h3>Description</h3>
                    <p>{monArticle.Description}</p>
                </div> 
                <div className="mon-profile">
                    <div>
                        <p>Review</p>
                        <img src="../../asset/rate.png" className="review"></img>
                    </div>
                </div>
            </div>
            <FormTemplate handleSubmit={handleSubmit}>
                <label>Quantité</label>
                <input
                type="number"
                name="Quantity"
                value={dataLigneCommande.Quantity}
                onChange={handleInputChange}
                required
                />
                <button className="AddToCart" type="submit">Ajouter au panier</button>
            </FormTemplate>
        </>
    )
}