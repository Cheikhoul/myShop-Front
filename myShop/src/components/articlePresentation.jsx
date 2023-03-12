export function ArticlePresentation(obj) {
    return (
        <div className="infos-supplementaires">
            <div className="article-description">
                <h3>Description</h3>
                <p>{obj.Description}</p>
            </div> 
            <div className="mon profile">
                <div className="nametag">
                    <p>Alexandre Dumas</p>
                    <div id="profilPic"></div>
                </div>
                <div className="review">
                    <img src="../../asset/rate.png"></img>
                </div>
            </div>
        </div>
    )
}



