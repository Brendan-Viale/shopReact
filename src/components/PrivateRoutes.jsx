import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token") || null;
  const navigate = useNavigate();

  useEffect(()=>{
    if(token === null) navigate("/login");
  }, [])

  return (
    <>
      {token !== null && 
        <Outlet />
      }
    </>
  )
}

export default PrivateRoutes