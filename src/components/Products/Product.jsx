import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../PanierContext";
import {useLocation} from "react-router-dom"
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { ProductCard } from "./ProductCard";
import "./product.css"

// Single product page
export const Product = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const url_product = location.pathname.split('/')[2].split('_');
    const url_category = location.pathname.split('/')[1].replaceAll("_"," ");
// Global context
    const {data, setData} = useContext(GlobalContext);
    const addToPanier = (id) => {
        let listProductsUpdated = [];
        let updated = 0;
        if(data.listProducts.length > 0){
            data.listProducts.forEach(productData => {
                if(id === productData.id){
                    listProductsUpdated.push({...productData, quantity : productData.quantity+1})
                    updated = 1;
                }
                else
                    listProductsUpdated.push({...productData});
            });
            if(!updated)
                setData({...data, 
                    nbProducts : data.nbProducts + 1,
                    listProducts : [...listProductsUpdated, {image : product.image, title : product.title, category : product.category, id : product.id, rating : product.rating, price : product.price, quantity : 1}]
                });
            else
                setData({...data, 
                    nbProducts : data.nbProducts + 1,
                    listProducts : [...listProductsUpdated]
                });
        }
        else 
            setData({...data, 
                nbProducts : data.nbProducts + 1,
                listProducts : [...listProductsUpdated, {image : product.image, title : product.title, category : product.category, id : product.id, rating : product.rating, price : product.price, quantity : 1}]
            });
    }

    async function getProduct(){
        let call = 'https://fakestoreapi.com/products/' + url_product[url_product.length-1];
        return await axios.get(call);
    }
    async function getByCategory(){
        let call = 'https://fakestoreapi.com/products/category/' + url_category;
        return await axios.get(call);
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getProduct(), getByCategory()])
        .then((res) => {
            setProduct(res[0].data);
            setCategory(res[1].data);
            console.log(category)
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.response?.data?.status_message);
            setIsLoading(false);
        })
        console.log()
    }, [location]);

    return(
        <>
            {error ? 
                ( <p>{error}</p> ) 
            : (
                <>
                    <div id="singleProductWrapper">
                        <section className="product">
                            {!isLoading ? (
                                <>
                                    <div>
                                        <div className="singleProductImage">
                                            <img src={product.image} alt={product.title} />
                                        </div>
                                        <aside>
                                            <h2>{product.title}</h2>
                                            <p className={"category " + location.pathname.split('/')[1].replace('\'', '')}>{product.category}</p>
                                            <p>{product.price}€</p>
                                            <button className="addToCartButton" onClick={()=>{addToPanier(product.id)}}>Ajouter au panier</button>
                                        </aside>
                                    </div>
                                    <h3>Description</h3>
                                    <p>{product.description}</p>
                                </>
                            ) : (
                                <>
                                    <PacmanLoader className="pacman" color="#44b0ee" loading={true} />
                                </>
                            )}
                        </section>
                    </div>
                    <section className="products_wrapper">
                        <h2>Produits similaires</h2>
                        {!isLoading ? (
                            <ul className="products">
                                {category.map((category_product) => (
                                    category_product.id !== product.id ? (
                                        <li key={category_product.id}>
                                            <ProductCard {...category_product} />
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        ) : (
                            <PacmanLoader className="pacman" color="#44b0ee" loading={true} />
                        )}
                    </section>
                </>
            )}
        </>
    )
}