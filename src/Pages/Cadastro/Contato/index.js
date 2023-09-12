import React, { useState, useEffect } from 'react';
import InputField from 'Components/Form/InputField/index';
import styles from './Contato.module.scss';

function Contato({ onUpdate }) {
  const [telefones, setTelefones] = useState([{ tipo: 'RESIDENCIAL', valor: '' }]);
  const [emails, setEmails] = useState(['']);

  useEffect(() => {
    onUpdate(telefones, emails);
  }, [telefones, emails, onUpdate]);

  const adicionarTelefone = () => {
    setTelefones(prev => [...prev, { tipo: 'Residencial', valor: '' }]);
  };

  const adicionarEmail = () => {
    setEmails(prev => [...prev, '']);
  };

  const handleDropdownChange = (index, novoTipo) => {
    setTelefones(prev => {
        const updated = [...prev];
        updated[index].tipo = novoTipo.toUpperCase();
        return updated;
    });
};


  const handleTelefoneChange = (index, novoValor) => {
    setTelefones(prev => {
      const updated = [...prev];
      updated[index].valor = novoValor;
      return updated;
    });
  };

  return (
    <div className={styles.contato}>
      <h1 className={styles.contato__Titulo}>Contatos</h1>
      <div className={styles.cadastro__form__content1}>
        <div className={styles.cadastro__form__content__Container}>
          {telefones.map((telefone, index) => (
            <InputField
              key={`${index}-${telefone.tipo}`}
              title={`Telefone ${index + 1}:`}
              required={index === 0}
              dropdownOptions={['Residencial', 'Comercial', 'Celular']}
              onDropdownChange={novoTipo => handleDropdownChange(index, novoTipo)}
              onChange={e => handleTelefoneChange(index, e.target.value)}
              maskId={telefone.tipo === 'Celular' ? 'celular' : 'telefone'}
              value={telefone.valor}
              className={styles.InputField_Contato}
            />
          ))}
          <button onClick={adicionarTelefone}>+</button>
        </div>
        <div className={styles.cadastro__form__content__Container1}>
          {emails.map((email, index) => (
            <InputField
              key={index}
              title={`E-mail ${index + 1}:`}
              required={index === 0}
              className={styles.InputField_Contato}
              value={email}
              onChange={(e) => {
                const newVal = e.target.value;
                setEmails(prevEmails => {
                  const updatedEmails = [...prevEmails];
                  updatedEmails[index] = newVal;
                  return updatedEmails;
                });
              }}
            />
          ))}
          <button onClick={adicionarEmail}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Contato;