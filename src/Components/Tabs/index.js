import React from 'react';
import styles from './Tabs.module.scss';
import cn from 'classnames';

function Tabs({ activeTab, setActiveTab }) {
    return (
      <div className={styles.tabQuery}>
        <div 
          className={cn(styles.adminTab, activeTab === 'admin' && styles.activeTab)}
          onClick={() => setActiveTab('admin')}>
          <h3 className={styles.adminTab__Titulo}>Administrador</h3>
        </div>
  
        <div 
          className={cn(styles.defaultTab, activeTab === 'default' && styles.activeTab)}
          onClick={() => setActiveTab('default')}>
          <h3 className={styles.defaultTab__Titulo}>Padrão</h3>
        </div>
      </div>
    );
  }
  
export default Tabs;
