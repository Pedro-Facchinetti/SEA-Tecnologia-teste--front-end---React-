import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

function Button({ children, className, ...props }) {
    const combinedClass = cn(styles.acessarButton, className);
    return (
      <button className={combinedClass} {...props}>
        <h3 className={styles.subtitle}>{children}</h3>
      </button>
    );
}
  
export default Button;
