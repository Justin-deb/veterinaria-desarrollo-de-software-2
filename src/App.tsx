import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Mascotas from "./pages/Mascotas";
import Informe from "./pages/Informe";
import NotFound from "./share/NotFound";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/mascotas" element={<Mascotas />} />
        <Route path="/informe" element={<Informe />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
