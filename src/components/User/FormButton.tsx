import React, { ReactNode } from 'react';
import styles from './FormButton.module.scss';

interface FormButtonProps {
  children: ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ children }) => {
  return <div className={styles.buttonBox}>{children}</div>;
};

export default FormButton;
