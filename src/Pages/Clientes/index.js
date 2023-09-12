import React, { useState, useEffect } from 'react';
import styles from './Clientes.module.scss';
import backgroundImage from 'Assets/background.svg';
import { applyMask } from 'Utils/applyMask';
import { useUser } from 'Contexts/UserContext';
import axios from 'axios';
import DocumentTitle from 'Utils/DocumentTitle';
import { useNavigate } from 'react-router-dom';

function Clientes(props) {
    const { user } = useUser();
    const userType = user.type;
    const [clientes, setClientes] = useState([]);

    const API_URL = 'http://localhost:8080/api';

    const navigate = useNavigate();

    const goToCadastro = () => {
        navigate('/cadastro');
    };

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`${API_URL}/clientes`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if (response.status === 200 && Array.isArray(response.data)) {
                    setClientes(response.data);
                } else {
                    setClientes([]);
                }
            } catch (error) {
                alert('Erro ao comunicar com a API.');
            }
        };

        fetchClientes();
    }, [API_URL, user.token]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.status === 200) {
                alert('Cliente excluído com sucesso!');
                setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
            } else {
                alert('Erro ao excluir cliente!');
            }
        } catch (error) {
            alert('Erro ao enviar dados para a API.');
        }
    };

    return (
        <>
            <DocumentTitle title="Clientes" />
            <div className={styles.clientes} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className={styles.clientes__content}>
                    <h1 className={styles.clientes__title}>Lista de Clientes</h1>
                    {userType === 'ADMIN' && (
                        <button className={styles.addButton} onClick={goToCadastro}>Cadastrar Novo Cliente</button>
                    )}
                    {clientes.length === 0 ? (
                        <p>Não há clientes registrados.</p>
                    ) : (
                        <table className={styles.clientes__table}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>CEP</th>
                                    <th>Logradouro</th>
                                    <th>Bairro</th>
                                    <th>Cidade</th>
                                    <th>UF</th>
                                    <th>Telefones</th>
                                    <th>Emails</th>
                                    {userType === 'ADMIN' && <th>Ação</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf ? applyMask(cliente.cpf, 'cpf') : ''}</td>
                                        <td>{cliente.endereco && cliente.endereco.cep ? applyMask(cliente.endereco.cep, 'cep') : ''}</td>
                                        <td>{cliente.endereco ? cliente.endereco.logradouro : ''}</td>
                                        <td>{cliente.endereco ? cliente.endereco.bairro : ''}</td>
                                        <td>{cliente.endereco ? cliente.endereco.cidade : ''}</td>
                                        <td>{cliente.endereco ? cliente.endereco.uf : ''}</td>
                                        <td>
                                            <select className={styles.dropdown}>
                                                {cliente.telefones.map((tel, index) => (
                                                    <option key={index} value={tel.numero}>
                                                        {`${tel.tipo}: ${tel.numero ? applyMask(tel.numero, tel.tipo === "CELULAR" ? 'celular' : 'telefone') : ''}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select className={styles.dropdown}>
                                                {cliente.emails.map((email, index) => (
                                                    <option key={index} value={email.valor}>{email.valor}</option>
                                                ))}
                                            </select>
                                        </td>
                                        {userType === 'ADMIN' && (
                                            <td>
                                                <button onClick={() => handleDelete(cliente.id)} className={styles.deleteButton}>Excluir</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Clientes;