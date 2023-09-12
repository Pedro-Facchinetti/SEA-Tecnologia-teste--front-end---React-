import React from 'react';
import styles from './RodapeForm.module.scss';
import Button from 'Components/Button/index';

import axios from 'axios';

function RodapeForm({ clienteData }) {
  
  const API_URL = 'http://localhost:8080/api';  

  function removePhoneMask(phone) {
    return phone.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
}

function removeCPFMask(cpf) {
  return cpf.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
}

const handleCadastro = async () => {
    if (!clienteData.nome || 
      !clienteData.cpf || 
      !clienteData.cep || 
      !clienteData.logradouro || 
      !clienteData.bairro || 
      !clienteData.cidade || 
      !clienteData.uf || 
      (clienteData.telefones && clienteData.telefones.length === 0) || 
      (clienteData.emails && clienteData.emails.length === 0)) 
  {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
  }
  try {
      // Ajustando os dados do cliente para o formato esperado pelo back-end
      const adjustedData = {
          ...clienteData,
          cpf: removeCPFMask(clienteData.cpf),
          endereco: {
              logradouro: clienteData.logradouro,
              bairro: clienteData.bairro,
              cidade: clienteData.cidade,
              uf: clienteData.uf,
              cep: clienteData.cep,
              complemento: clienteData.complemento
          },
          telefones: clienteData.telefones.map(telefone => ({
              tipo: telefone.tipo,
              numero: removePhoneMask(telefone.valor)
          })),
          emails: clienteData.emails.map(email => ({ valor: email }))
      };

      const response = await axios.post(`${API_URL}/clientes`, adjustedData, {
          headers: {
              Authorization: `Bearer ${clienteData.token}`
          }
      });

      if (response.status === 200) {
          alert('Cliente cadastrado com sucesso!');
      } else {
          alert('Erro ao cadastrar cliente!');
      }
  } catch (error) {
      if (error.response && error.response.data) {
          alert('Erro: ' + error.response.data);
      } else {
          alert('Erro ao enviar dados para a API.');
      }
  }
};


  return (
    <div className={styles.cadastro__form__content__rodape}>
      <h3 className={styles.cadastro__form__content__rodape__info}>
        Campos que possuem * são obrigatórios
      </h3>
      <Button className={styles.rodapeButton} onClick={handleCadastro}>Cadastrar cliente</Button>
    </div>
  );
}

export default RodapeForm;