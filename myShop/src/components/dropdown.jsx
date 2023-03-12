export const Dropdown = ({ title, content }) => {
 

  return (
    <article className="dropdown">
            <button className="btn btn-primary"
            type="button" data-toggle= "collapse" 
            data-target={`#collapseDescription-${title}`}  aria-expanded="false" 
            aria-controls={`collapseDescription-${title}`} >
                {title}
            </button> 
        <div className={`collapse`}
         id={`collapseDescription-${title}`}>
            <div className="card card-body">
                {content}
            </div>
        </div>
    </article>
  )
}
