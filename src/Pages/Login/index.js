import React, { useState } from 'react';
import styles from './Login.module.scss';
import Tabs from 'Components/Tabs';
import InputField from 'Components/Form/InputField';
import Button from 'Components/Button';
import cn from 'classnames';
import backgroundImage from 'Assets/background.svg';
import { useUser } from 'Contexts/UserContext';
import axios from 'axios';

function Login(props) {
  const [activeTab, setActiveTab] = useState('admin'); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            username: username,
            password: password
        });
      
        if (response.data && response.data.role) {
            loginUser(response.data.role, response.data.username, response.data.token);
        } else {
            alert('Resposta inesperada da API.');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Erro ao fazer login.');
        }
    }
};

  return (
    <div
      className={cn(styles.root, 'login')}
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.form}>
        <div className={styles.form__content}>

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className={styles.form__content__InputContainer}>
            <InputField 
              title="Nome de usuário:" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            <InputField 
              title="Senha:" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <Button onClick={handleLogin}>Acessar o sistema</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;