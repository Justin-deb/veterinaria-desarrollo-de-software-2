import { useContext } from "react"
import { ClientContext } from "../context/ClientContext";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const context = useContext(ClientContext);
  const navigate = useNavigate();

  if(context?.clientID === '-1'){
    return <Navigate to={'/login'}/>
  }

  const logoutHandler = () => {
    console.log(context?.clientID);
    context?.setClientID('-1');
    console.log(context?.clientID);
    navigate('/login');
  }

  return (
    <div>

      <div className="text-6xl">Home</div>

      <button onClick={logoutHandler}>Logout</button>
    </div>
    
    

  )
}

export default HomePage