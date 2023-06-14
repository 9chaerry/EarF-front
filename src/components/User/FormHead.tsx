import React from 'react';
import styles from './FormHead.module.scss';
import { Link } from 'react-router-dom';

interface HeadProps {
  heading: string;
  description: string;
  showLoginLink?: boolean;
}

const FormHead: React.FC<HeadProps> = ({ heading, description, showLoginLink }) => {
  return (
    <>
      <div className={styles.logo}>
        <span>EarF</span>
      </div>
      <div className={styles.title}>
        <h2>{heading}</h2>
        <p>
          {description} {showLoginLink && <Link to='/login'>로그인</Link>}
        </p>
      </div>
    </>
  );
};

export default FormHead;
