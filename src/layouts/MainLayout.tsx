import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import { ToastContainer } from "react-toastify"

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet/>
        <Footer />
        <ToastContainer />
    </>

  )
}

export default MainLayout