/* eslint-disable react/prop-types */


// Product card
import { useContext } from "react";
import { GlobalContext } from "../../PanierContext";
import { Link } from "react-router-dom";
import { Stars } from "../Categories/Stars";
import "./productCard.css"

export const ProductCard = ({image, title, category, id, rating, price}) => {
    const {data, setData} = useContext(GlobalContext);
    const addToPanier = (id) => {
        let listProductsUpdated = [];
        let updated = 0;
        if(data.listProducts.length > 0){
            // Pour chaque produit enregistré dans notre Context (data)
            data.listProducts.forEach(productData => {
                // Si l'id du produit que l'on souhaite ajouter est égal à celui que l'on regarde dans data
                if(id === productData.id){
                    // On récupère le produit depuis data dans listProductsUpdated avec une quantité incrémentée
                    listProductsUpdated.push({...productData, quantity : productData.quantity+1})
                    updated = 1;
                }
                // Sinon, on récupère le produit tel quel afin de conserver une copie intégrale de data
                else
                    listProductsUpdated.push({...productData});
            });

            // Si le produit n'a pas été inséré, on l'ajoute à Data
            if(!updated)
                setData({...data, 
                    nbProducts : data.nbProducts + 1,
                    listProducts : [...listProductsUpdated, {image, title, category, id, rating, price, quantity : 1}]
                });
            // Sinon on récupère tout listProductsUpdated
            else
                setData({...data, 
                    nbProducts : data.nbProducts + 1,
                    listProducts : [...listProductsUpdated]
                });
        }
        // Si data est vide (donc rien dans le panier), on ajoute le produit directement
        else 
            setData({...data, 
                nbProducts : data.nbProducts + 1,
                listProducts : [{image, title, category, id, rating, price, quantity:1}]
            });
    }

    return(
        <div className="productCard">
            <img src={image} alt={title} />
            <div>
                <Link to={`/${category.replaceAll(" ","_")}/${title.replaceAll(/[ /]/g,"_")}_${id}`}>
                    <h3 className="title">{title}</h3>
                    <div className="rating">
                        <Stars rating={rating.rate} />
                        <p>{rating.count} avis</p>
                    </div>
                </Link>
                <div className="addToCart">
                    <button onClick={()=>{addToPanier(id)}}>Ajouter au panier</button>
                    <p className="price">{price}€</p>
                </div>
            </div>
        </div>
    )
}