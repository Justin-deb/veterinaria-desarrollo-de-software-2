import { useContext } from "react"
import { ClientContext } from "../context/ClientContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getPets } from "../services/Pet.service";
import PetProfilePage from "./PetProfilePage";

const HomePage = () => {
  const context = useContext(ClientContext);
  const navigate = useNavigate();

  if(context?.clientID === '-1'){
    return <Navigate to={'/login'}/>
  }

  const logoutHandler = () => {
    context?.setClientID('-1');
    navigate('/login');
  }

  return (
    <div>

      <div className="text-6xl">Home</div>

      <Link to={'pet/Milo'}>Ver Mascota</Link>

      <button onClick={logoutHandler}>Logout</button>
    </div>
    
    

  )
}

export default HomePage