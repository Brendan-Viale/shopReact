import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import "./subHeader.css"

export const SubHeader = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    //Fonction permettant d'adapter l'url à la catégorie
    const setLink = (categorie) => {
        switch(categorie){
            case "electronics" : return "electronics";
            case "jewelery" : return "jewelery";
            case "men's clothing" : return "men_clothing";
            case "women's clothing" : return "women_clothing";
            default : return "yolo";
        }
    }

    //Je récupère les catégories depuis l'API
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
        .then((res) => {
            setCategories(res.data);
        })
        .catch((err) => setError(err.response?.data?.status_message))
    }, []);

    return(
        <nav id="subHeader">
            {/* S'il y a une erreur, je l'affiche */}
            {error ? <p>{error}</p> : (
                // Sinon, si les catégories sont chargées, je les affiche
                categories.length > 0 ? (
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>All</NavLink>
                        </li>
                        {categories.map((categorie) => (
                            <li key={categorie}>
                                {/* Je crée un nouveau lien pour chaque catégorie, l'url est donnée dans la fonction setLink */}
                                <NavLink to={setLink(categorie)} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>{categorie}</NavLink>                            
                            </li>
                        ))}
                    </ul>
                // Sinon, je mets le loader (les infos arrivent)
                ) : (
                    <p>Loading...</p>
                )
            )}
        </nav>
    )
}