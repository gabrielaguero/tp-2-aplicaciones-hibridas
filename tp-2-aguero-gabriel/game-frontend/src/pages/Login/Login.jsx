import React, { useContext, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Cookies from "js-cookie";


const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email:'',
    password:''
  });
  const [error, setError] = useState('');

  const {setUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3002/users/login", userData)
    .then((res) => {
        console.log(res);
        setUser({
            name: res.data.usuario.name,
            id: res.data.usuario._id
        })
        Cookies.set('jwToken', res.data.jwToken, {expires: 3});
        navigate('/');
    })
    .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
    });
};
  return (
    <div>
        <h2 className='text-danger fs-2 fw-bold my-5 text-center'>Iniciar sesión</h2>
        <form className='bg-dark mb-3 rounded shadow w-25 text-white mx-auto p-5'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                <input
                type="email"
                className="form-control"
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input 
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
            </div>
            <button type="submit" onClick={handleLogin} className="btn btn-danger d-block mx-auto w-50 mt-4 shadow">Submit</button>
        </form>
    </div>
  )
}

export {Login}