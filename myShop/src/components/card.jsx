import React from 'react';

export function Card({ obj }) {
    return (
        <div className="carte">
            <div className="filter-carte"></div>
            <h2 className="titreArticle">{obj.ArticleName}</h2>
            <h3 className='prixArticle'>{obj.Price}</h3>
        </div>

    )
}
