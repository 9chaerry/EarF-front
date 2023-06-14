import Button from 'components/common/Button';
import styles from './Modal.module.scss';
import { ChangeEvent } from 'react';
import { ReactComponent as Exit } from 'assets/icons/Exit.svg';
import { checkPassword } from 'api/fetcher';
import { useState } from 'react';

interface ModalProps {
  handleShowModal: () => void;
  handleNavigateToEdit: () => void;
}

function Modal({ handleShowModal, handleNavigateToEdit }: ModalProps) {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleCheckPassword = async () => {
    try {
      await checkPassword(password);
      handleNavigateToEdit();
    } catch (error) {
      setIsValid((prev) => !prev);
      console.error('요청 실패', error);
    }
  };

  return (
    <div className={styles.modalBox}>
      <Exit className={styles.exitButton} onClick={handleShowModal}>
        x
      </Exit>
      <p className={styles.text}>비밀번호를 입력해주세요</p>
      <div className={styles.passwordInput}>
        <label htmlFor='password'></label>
        <input type='password' id='password' value={password} placeholder='********' onChange={handleChange} />
      </div>
      {!isValid && <p className={styles.errorMessage}>비밀번호가 일치하지 않습니다</p>}
      <Button text={'확인'} onClick={handleCheckPassword} />
    </div>
  );
}

export default Modal;
