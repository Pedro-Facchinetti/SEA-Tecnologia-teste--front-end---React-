import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import DadosPessoais from './DadosPessoais';
import Endereco from './Endereco';
import Contato from './Contato';
import RodapeForm from './RodapeForm';
import styles from './Cadastro.module.scss';
import backgroundImage from 'Assets/background.svg';
import DocumentTitle from 'Utils/DocumentTitle';

function Cadastro(props) {
  const [clienteData, setClienteData] = useState({
    nome: '',
    cpf: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    complemento: '',
    telefones: [],
    emails: []
  });

  const updateDadosPessoais = useCallback((nome, cpf) => {
    setClienteData(prev => ({ ...prev, nome, cpf }));
  }, []);

  const updateEndereco = useCallback((cep, logradouro, bairro, cidade, uf, complemento) => {
    setClienteData(prev => ({ ...prev, cep, logradouro, bairro, cidade, uf, complemento }));
  }, []);

  const updateContato = useCallback((telefones, emails) => {
    setClienteData(prev => ({ ...prev, telefones, emails }));
  }, []);

  return (
    <>
    <DocumentTitle title="Cadastrar" />
    <div className={cn(styles.cadastro, 'cadastro')} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.cadastro__form}>
        <div className={styles.cadastro__form__content}>
          <h1 className={styles.cadastro__form__content__Titulo}>Cadastro de clientes</h1>
          <DadosPessoais onUpdate={updateDadosPessoais} />
          <Endereco onUpdate={updateEndereco} />
          <Contato onUpdate={updateContato} />
          <RodapeForm clienteData={clienteData} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Cadastro;