/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {useLocation} from "react-router-dom"
import axios from "axios";
import "./categories.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { ProductCard } from "../Products/ProductCard";

export const Categories = ({categorie}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const category = categorie ? "category/" + categorie : "";
    const lastPage = useRef("/");
    //Je récupère les catégories depuis l'API
    useEffect(() => {
        if(lastPage.current !== location.pathname)
            setProducts([]);
        lastPage.current=location.pathname;
        axios.get('https://fakestoreapi.com/products/' + category)
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => setError(err.response?.data?.status_message))
    }, [location.pathname]);

    return(
        <section className="products_wrapper">
            {error ? <p>{error}</p> : (
                // Sinon, si les catégories sont chargées, je les affiche
                products.length > 0 ? (
                    <ul className="products">
                        {products.map((product) => (
                            <li key={product.id}>
                                <ProductCard {...product} />
                            </li>
                        ))}
                    </ul>
                // Sinon, je mets le loader (les infos arrivent)
                ) : (
                    <PacmanLoader className="pacman" color="#44b0ee" loading={true} />
                )
            )}
        </section>
    )
}