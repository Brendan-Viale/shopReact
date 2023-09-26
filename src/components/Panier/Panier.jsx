import { GlobalContext } from "../../PanierContext";
import { useContext } from "react";
import { PanierImg, PanierItem, PanierList } from "./Panier_styled";
import { Link } from "react-router-dom";

export const Panier = () => {
    const {data, setData} = useContext(GlobalContext);
    const deleteProduct = (productId) => {
        let listProductsUpdated = [];
        data.listProducts.forEach(productData => {
            if(productData.id === productId.id){
                productId.quantity > 1 ? listProductsUpdated.push({...productData, quantity : productData.quantity-1}) : null
            }
            else{
                listProductsUpdated.push({...productData});
            }
        });
        setData({...data, 
            nbProducts : data.nbProducts - 1,
            listProducts : [...listProductsUpdated]
        });
    }
    return(
        <section>
            <PanierList>
                {data.listProducts.length > 0 ? (
                    <>
                        {data.listProducts.map((productData)=>(
                            <PanierItem key={productData.id}>
                                <PanierImg src={productData.image} />
                                <div style={{marginLeft:"30px"}}>
                                    <h2>{productData.title}</h2>
                                    <p>{productData.price * productData.quantity} €</p>
                                    <p>Quantité : {productData.quantity}</p>
                                    <button onClick={()=>{deleteProduct(productData)}} >X</button>
                                </div>
                            </PanierItem>
                        ))}
                        <button>Payer</button>
                    </>
                ) : (
                    <p><Link to="/">Ajoutez des articles à votre panier avant de passer commande.</Link></p>
                )}
                
            </PanierList>
            
        </section>
    )
}