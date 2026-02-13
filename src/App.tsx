import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "./app.css";
import Home from './components/Home';
import PetProfile from './layouts/PetProfile';
import Login from './components/Login';
import ClientDetails from './components/ClientDetails';
import MainLayout from './layouts/MainLayout';

function App() {

  const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/pet/:name' element={<PetProfile/>}/>
    </Route>
  ));

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
