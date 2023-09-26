import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || '');
  const [password, setPassword] = useState(localStorage.getItem("password") || '');
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const verifyIds = (e) => {
    e.preventDefault();
    if(checked){
      localStorage.setItem("username",username)
      localStorage.setItem("password",password)
    }
    else{
      localStorage.clear();
    }

    axios({
      method: 'post',
      url: 'https://fakestoreapi.com/auth/login',
      data: {
        username: username,
        password: password
      }
    })
    .then((res)=>{
      sessionStorage.setItem("token",res.data.token);
      navigate("/admin");
    })
    .catch((err)=>{
      setError(err.response.data)
    })
  }

  return (
    <form id="loginForm" onSubmit={verifyIds}>
      <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
      <input type="text" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <div>
        <input type="checkbox" name="souvenir" onChange={(e)=>{setChecked(e.target.checked)}} checked={checked}/>
        <label htmlFor="souvenir">Se souvenir de moi</label>
      </div>
      <button type="submit">Se connecter</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login