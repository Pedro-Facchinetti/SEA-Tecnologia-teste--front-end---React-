import React, { useState, useEffect } from 'react';
import InputField from 'Components/Form/InputField/index';
import styles from './Endereco.module.scss';

function Endereco({ onUpdate }) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    complemento: ''
  });

  const { logradouro, bairro, localidade, uf, complemento } = endereco;

  useEffect(() => {
    if (cep.length === 8) {
      fetchCepData(cep);
    }
  }, [cep]);

  useEffect(() => {
    onUpdate(cep, logradouro, bairro, localidade, uf, complemento);
  }, [cep, logradouro, bairro, localidade, uf, complemento, onUpdate]);

  const fetchCepData = async (cepValue) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setEndereco(data);
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      alert("Erro ao buscar CEP.");
    }
  };

  const handleCepChange = (event) => {
    const cepValue = event.target.value.replace(/\D+/g, '');
    setCep(cepValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEndereco(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.endereco}>
      <h1 className={styles.endereco__Titulo}>Endereço</h1>
      <div className={styles.endereco__Content}>
        <div className={styles.endereco__Content__Container}>
          <InputField title="CEP:" required={true} onChange={handleCepChange} maskId="cep" value={cep} />
          <div className={styles.endereco__Content__Container__spacer} />
          <InputField title="Logradouro:" required={true} value={logradouro || ''} onChange={handleInputChange} name="logradouro" />
          <div className={styles.endereco__Content__Container__spacer} />
          <InputField title="Bairro:" required={true} value={bairro || ''} onChange={handleInputChange} name="bairro" />
        </div>
        <div className={styles.endereco__Content__Container}>
          <InputField title="Cidade:" required={true} value={localidade || ''} onChange={handleInputChange} name="localidade" />
          <div className={styles.endereco__Content__Container__spacer1} />
          <InputField title="UF:" required={true} value={uf || ''} onChange={handleInputChange} name="uf" />
          <div className={styles.endereco__Content__Container__spacer2} />
          <InputField title="Complemento:" value={complemento || ''} onChange={handleInputChange} name="complemento" />
        </div>
      </div>
    </div>
  );
}

export default Endereco;