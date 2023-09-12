import React, { useEffect } from 'react';
import styles from './InputField.module.scss';
import InputMask from 'react-input-mask';

function InputField({
  title,
  type = "text",
  required = false,
  info1,
  info2,
  dropdownOptions = [],
  maskId,
  onDropdownChange, // Desestruturamos aqui para que não seja repassado para o input
  ...inputProps // Todas as outras propriedades serão recolhidas aqui
}) {
  const isPasswordField = type === 'password';

  const MASKS = {
    cep: "99999-999",
    telefone: "(99) 9999-9999",
    celular: "(99) 99999-9999",
    cpf: "999.999.999-99"
  };

  const validateNome = (value) => {
    const regex = /^[a-zA-Z0-9\s]{3,100}$/;
    return regex.test(value);
  };

  const handleBlur = (event) => {
    if (maskId === "nome" && !validateNome(event.target.value)) {
      alert("Nome inválido! Por favor, insira entre 3 e 100 caracteres (apenas letras, números e espaços).");
    }
  };

  useEffect(() => {
    // A lógica aqui é apenas para forçar o re-render ao mudar o maskId
  }, [maskId]);

  const renderInput = () => {
    if (maskId && MASKS[maskId]) {
      return (
        <InputMask
          mask={MASKS[maskId]}
          {...inputProps}
          className={styles.rect}
          onBlur={handleBlur}
        />
      );
    }
    if (maskId === "nome") {
      return (
        <input
          type={type}
          maxLength={100}
          {...inputProps}
          className={styles.rect}
          onBlur={handleBlur}
        />
      );
    }
    return <input type={type} {...inputProps} className={styles.rect} />;
  };

  return (
    <div className={isPasswordField ? styles.passwordFieldContainer : styles.inputFieldContainer}>
      <div className={isPasswordField ? styles.passwordField : styles.inputField}>
        <h3 className={styles.subtitle_box}>
          {required && <span className={styles.subtitle_span1}>*</span>}
          <span className={styles.subtitle_span0}>{title}</span>
        </h3>
        {renderInput()}
        {dropdownOptions.length > 0 && (
          <select
            className={styles.dropdown}
            onChange={(e) => {
              if (onDropdownChange) {
                onDropdownChange(e.target.value);
              }
            }}
          >
            {dropdownOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
      {info1 && <div className={styles.info1}>{info1}</div>}
      {info2 && <div className={styles.info2}>{info2}</div>}
    </div>
  );
}

export default InputField;