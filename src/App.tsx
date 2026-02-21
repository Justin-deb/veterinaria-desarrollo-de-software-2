import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "./app.css";
import MainLayout from './layouts/MainLayout';
import { ClientContext } from './context/ClientContext';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PetProfilePage from './pages/pet/PetProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PetListPage from './pages/pet/PetListPage';
import ClientDetailsPage from './pages/client/ClientDetailsPage';

function App() {
  const [clientID, setClientID] = useState<string>(
    sessionStorage.getItem('clientID') || '-1'
  );

  useEffect(() => {
    if (clientID !== null) {
      sessionStorage.setItem("clientID", clientID);
    }
  }, [clientID]);

  const routes = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/login' element={<LoginPage />}>
      </Route>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='pets/:name' element={<PetProfilePage />} />
        <Route path='pets' element={<PetListPage/>}/>
        <Route path='clientDetails' element={<ClientDetailsPage />} />
        
      </Route>
      <Route path='*' element={<NotFoundPage/>}/>
    </>
  ));

  return (
    <ClientContext.Provider value={{ clientID, setClientID }}>
      <RouterProvider router={routes}></RouterProvider>
    </ClientContext.Provider>
  )
}

export default App