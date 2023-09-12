import React from 'react';
import styles from './Menu.module.scss';
import backgroundImage from 'Assets/background.svg';
import Button from 'Components/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'Contexts/UserContext';

function Menu({ userType }) {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleCadastroClick = () => {
    navigate('/cadastro');
  };

  const handleVisualizarClick = () => {
    navigate('/clientes');
  };

  const handleLogoutClick = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.form}>
        <div className={styles.form__content}>
          <h1 className={styles.menu__Titulo}>Menu</h1>

          {userType === "ADMIN" && (
            <Button className={styles.menuButton} onClick={handleCadastroClick}>
              Cadastrar Cliente
            </Button>
          )}

          <Button className={styles.menuButton} onClick={handleVisualizarClick}>
            Visualizar Clientes
          </Button>

          <Button className={styles.menuButton} onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;