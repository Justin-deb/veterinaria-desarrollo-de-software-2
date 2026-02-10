import { NavLink } from "react-router-dom";
import "./Navegar.css";

export default function Navegar(){
    return(
        <nav className="tabs">
            <NavLink to="/" className="tab">Home</NavLink>
            <NavLink to="/usuarios" className="tab">Usuarios</NavLink>
            <NavLink to="/mascotas" className="tab">Mascotas</NavLink>
            <NavLink to="/informe" className="tab">Informe médico</NavLink>
        </nav>
    )
}
