import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "./app.css";
import Home from './components/Home';
import PetProfile from './layouts/PetProfile';
import Login from './components/Login';

function App() {

  const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Login/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/pet/:name' element={<PetProfile/>}/>
    </Route>
  ));

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
