import React, { useState } from 'react';
import InputField from 'Components/Form/InputField/index';
import styles from './DadosPessoais.module.scss';

function DadosPessoais({ onUpdate }) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    const handleNomeChange = (event) => {
        const newNome = event.target.value;
        setNome(newNome);
        onUpdate(newNome, cpf);
    };

    const handleCpfChange = (event) => {
        const newCpf = event.target.value;
        setCpf(newCpf);
        onUpdate(nome, newCpf);
    };

    return (
        <div className={styles.dadosPessoais}>
            <h1 className={styles.titulo}>Dados pessoais</h1>
            <div className={styles.dadosPessoais__InputContainer}>
                <InputField 
                    title="Nome:"
                    info1="Apenas letras,espaços,números"
                    info2="Mín. 3 e Máx. 100"
                    required={true}
                    maskId="nome"
                    value={nome}
                    onChange={handleNomeChange}
                />
                <div className={styles.dadosPessoais__InputContainer__spacer} />
                <InputField 
                    title="CPF:"
                    info1="Apenas números"
                    required={true}
                    maskId="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                />
            </div>
        </div>
    );
}

export default DadosPessoais;