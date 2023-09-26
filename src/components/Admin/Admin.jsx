import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css"

export const Admin = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [updated, setUpdated] = useState('')

    // Form
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);

    //Je récupère les produits depuis l'API
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => setError(err.response?.data?.status_message))
    }, []);

    // Supprime le produit voulu
    const deleteProduct = (id)=>{
        axios.delete('https://fakestoreapi.com/products/' + id)
        .then((res) => {
            let productsBuffer = [];
            products.map((product)=>(
                product.id !== res.data.id ? productsBuffer.push(product) : null
            ));
            setProducts(productsBuffer)
        })
        .catch((err) => setError(err.response?.data?.status_message))
    }

    const update = (product)=>{
        if(updated === "")
            setUpdated(product);
        else{
            cancelUpdate(updated);
            setUpdated(product);
        }
        setImage(product.image)
        setTitle(product.title)
        setDescription(product.description)
        setCategory(product.category)
        setPrice(product.price)
    }

    // Annuler les modifications
    const cancelUpdate = (product)=>{
        setUpdated("");
        setImage(product.image)
        setTitle(product.title)
        setDescription(product.description)
        setCategory(product.category)
        setPrice(product.price)
    }

    // Enregistrer les modifications
    const validateUpdate = (product)=>{
        // On supprime le produit de la liste des produits modifiables
        setUpdated("")

        // On modifie le produit dans la db
        axios({
            method: 'put',
            url: 'https://fakestoreapi.com/products/' + product.id,
            data: {
                title: title,
                price: price,
                description: description,
                image: image,
                category: category
            }
        })
        .then((res)=>{
            let productsBuffer = [];
            let productUpdated = res.data;
            // On modifie également le produit d'après le résultat de la requête dans notre liste des produits
            // (inutile en pratique, la bdd n'est pas modifiable donc c'est le meilleur moyen de vérifier que ça ait fonctionné, sinon on n'aurait rien eu besoin de faire)
            products.map((productList)=>(
                productList.id !== productUpdated.id ? productsBuffer.push(productList) : 
                    productsBuffer.push({
                        image : productUpdated.image,
                        id : productUpdated.id,
                        price : productUpdated.price,
                        title : productUpdated.title,
                        description : productUpdated.description,
                        category : productUpdated.category
                    })
            ));
            setProducts(productsBuffer)
        })
        .catch((err)=>{
            setError(err.response.data)
        })
    }

    return (
        <section id="admin">
            {error ? (
                <div>Error</div>
            ) : (
                products.length>0 ? (
                    <ul>
                        {/* Pour chaque produit enregistré dans la bdd */}
                        {products.map((product)=>(
                            <li key={product.id}>
                                {/* Si le produit n'apparait pas dans la liste des produits modifiables (contenus dans "updated") */}
                                {updated.id!==product.id ? (
                                    <>
                                        <img className="adminImg" src={product.image} alt={product.title} />
                                        <h3>{product.title}</h3>
                                        <p>Category : {product.category}</p>
                                        {/* On limite la description à 100 caractères maximum suivis de "...", si elle fait moins on l'affiche sans les "..." */}
                                        <p className="priceAdmin">Desription : {product.description.length>100 ? product.description.substring(0,100) + "..." : product.description}</p>
                                        <p>{product.price}€</p>
                                        {/* On rajoute le produit à la liste des produits modifiables */}
                                        <button onClick={()=>{update(product)}}>Modifier</button>
                                        <button onClick={()=>{deleteProduct(product.id)}}>Supprimer</button>
                                    </>
                                // Sinon, on affiche toutes les informations en tant qu'inputs modifiables
                                ) : (
                                    <>
                                        <input className="adminImg" type="text" value={image !== null ? image : setImage(product.image)} onChange={(e)=>{setImage(e.target.value)}} />
                                        <input type="text" value={title !== null ? title : setTitle(product.title)} onChange={(e)=>{setTitle(e.target.value)}} />
                                        <input type="text" value={category !== null ? category : setCategory(product.category)} onChange={(e)=>{setCategory(e.target.value)}} />
                                        <textarea className="priceAdmin" value={description !== null ? description : setDescription(product.description)} onChange={(e)=>{setDescription(e.target.value)}} />
                                        <input type="text" value={price !== null ? price : setPrice(product.price)} onChange={(e)=>{setPrice(e.target.value)}} />
                                        <div id="updateButtons">
                                            <button onClick={()=>{validateUpdate(product)}}>Valider</button>
                                            <button onClick={()=>{cancelUpdate(product)}}>Annuler</button>
                                        </div>
                                        <button onClick={()=>{deleteProduct(product.id)}}>Supprimer</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading</p>
                )
            )}
        </section>
    )
}
