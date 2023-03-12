export function CardContainer({ children }) {
    return (
        <>
            <span id="cardContainerTitle">Tout le Catalogue</span>
            <section className="cardContainer">
                {children}
            </section>
        </>
        
    )
}