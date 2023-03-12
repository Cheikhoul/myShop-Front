import { Card } from "../components/card";
import { Banner } from "../components/banner";
import { CardContainer } from "../components/cardContainer";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/api/article/articles");
      setArticles(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
        <Banner/>
        <CardContainer>
            {articles.map((article, index) => 
                <Link
                to={{
                    pathname: `/details/${article.id}`,
                    state: { article }
                }}
                style={{textDecoration:'none'}}>
                    <Card key={index} obj={article} />
                </Link>)}
        </CardContainer>
    </div>
  );
}
