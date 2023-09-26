import {Link, useLocation, useNavigate} from 'react-router-dom'
import logo from '../../assets/img/Logo_BV.png';
import cart from '../../assets/img/panier.png';
import "./header.css";
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../PanierContext';

export const Header = () => {
    // eslint-disable-next-line no-unused-vars
    const {data, setData} = useContext(GlobalContext);
    const [token, setToken] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const disconnect = ()=>{
        setToken(null);
        sessionStorage.clear();
        if(location.pathname==="/admin") navigate("/")
    }

    useEffect(()=>{
        setToken(sessionStorage.getItem("token") || null);
    }, [location])

    return(
        <header>
            <nav>
                <img id="logo" src={logo} alt="Logo de l'entreprise" />
                <Link to="/">Marketplace</Link>
                <div>   
                    {token !== null ? (
                        <>
                            <button onClick={disconnect}>Déconnexion</button>
                            <Link to="/admin">Admin</Link>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <Link to="/panier">
                        <img className="icon" src={cart} alt="Icone du panier" />
                        {data?.nbProducts>0 &&
                            <p id="nbProducts">{data.nbProducts}</p>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}