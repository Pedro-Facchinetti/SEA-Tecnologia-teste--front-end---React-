import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  
  // Tentativa de recuperar os valores do localStorage:
  const initialType = localStorage.getItem('userType');
  const initialID = localStorage.getItem('userID');
  const initialToken = localStorage.getItem('token');

  const [user, setUser] = useState({
    type: initialType || null,
    id: initialID || null,
    token: initialToken || null
  });

  const loginUser = (type, id, token) => {
    setUser({ type, id, token });
    
    // Armazenar essas informações no localStorage
    localStorage.setItem('userType', type);
    localStorage.setItem('userID', id);
    localStorage.setItem('token', token);
  };

  const logoutUser = () => {
    setUser({ type: null, id: null, token: null });
    localStorage.clear(); // Isso limpará todas as entradas no localStorage. Se houver outras entradas não relacionadas ao usuário, considere usar removeItem para cada chave específica.
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser, UserContext };