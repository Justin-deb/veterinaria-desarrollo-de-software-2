import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "./app.css";
import Home from './components/Home';
import Login from './components/Login';

function App() {

  const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Login/>}>
      <Route index element={<Home/>}></Route>
    </Route>
  ));

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
