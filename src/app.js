import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from 'Pages/Login/index';
import { UserProvider, useUser } from 'Contexts/UserContext';
import Menu from 'Pages/Menu';
import Cadastro from 'Pages/Cadastro';
import Clientes from 'Pages/Clientes';
import ProtectedRoute from 'Utils/ProtectedRoute';
import { useEffect } from 'react';
import DocumentTitle from 'Utils/DocumentTitle';

function HomeRoute() {
  const { user } = useUser();
  return (
    <>
      <DocumentTitle title="Home" />
      {user.type ? <Menu userType={user.type} /> : <Login />}
    </>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = "404: Not Found";
    window.status = 404;
  }, []);

  return null;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomeRoute />} />
          <Route path="/cadastro" element={
            <ProtectedRoute allowedUserTypes={['ADMIN']}>
              <Cadastro />
            </ProtectedRoute>
          } />
          <Route path="/clientes" element={
            <ProtectedRoute allowedUserTypes={['ADMIN', 'PADRAO']}>
              <Clientes />
            </ProtectedRoute>
          } />
          <Route path="/404" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;