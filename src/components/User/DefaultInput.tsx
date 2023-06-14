import styles from './DefaultInput.module.scss';
import React, { ChangeEvent } from 'react';

interface DefaultInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  error: boolean;
  errorMessage: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DefaultInput: React.FC<DefaultInputProps> = ({ label, type, id, value, error, errorMessage, onChange }) => {
  return (
    <div className={styles.formElement}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
      <div className={styles.error}>{error && errorMessage}</div>
    </div>
  );
};

export { DefaultInput };
