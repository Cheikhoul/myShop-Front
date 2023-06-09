import { BannerAbout } from "../components/bannerAbout";
import { Dropdown } from "../components/dropdown";

const ABOUT_FAQ = [
    {
      title: "Fiabilité",
      content:
        "Les annonces postées sur myShop garantissent une fiabilité totale. Les photos sont conformes aux produits, et toutes les informations sont régulièrement vérifiées  par nos équipes.",
    },
    {
      title: "Respect",
      content:
        "La bienveillance fait partie des valeurs fondatrices de myShop. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.",
    },
    {
      title: "Service",
      content:
        "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
    },
    {
      title: "Responsabilité",
      content:
        "La sécurité est la priorité de myShop. Aussi bien pour nos hôtes que pour les clients, chaque produit réponds aux critères de sécurité établis par nos services. En laissant une note, cela permet à nos équipes de vérifier que les standards sont bien respectés.",
    },
]

const DropdownList = ({ list }) => {
    return (
      <div className="dropdown-container">
        {list.map((item, index) => (
            <Dropdown
                key={index}
                title={item.title}
                content={item.content}
            />
        ))}
      </div>
    )
  }

export function About() {
    return (
        <>
            <BannerAbout/>
            <DropdownList list={ABOUT_FAQ} />
        </> 
    )
}