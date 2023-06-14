import styles from './ChangePassword.module.scss';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeToken, removeAccessTokenTime } from 'api/token';

import FormHead from 'components/User/FormHead';
import FormButton from 'components/User/FormButton';
import { DefaultInput } from 'components/User/DefaultInput';
import { validateField } from 'components/User/validation';
// import { ChangePassword } from 'components/common/Fetcher';

import JoginIllust from '../assets/images/JoinIllust.jpg';

interface FormData {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });

  const [validation, setValidation] = useState<{ [key: string]: boolean }>({
    currentPassword: false,
    password: false,
    passwordConfirm: false,
  });

  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const newValidation = {
      currentPassword: validateField('currentPassword', formData.currentPassword, formData),
      password: validateField('password', formData.password, formData),
      passwordConfirm: validateField('passwordConfirm', formData.passwordConfirm, formData),
    };

    setValidation(newValidation);
  }, [formData]);

  useEffect(() => {
    const isFormValid = Object.values(validation).every((isValid) => isValid);
    setFormValid(isFormValid);
  }, [validation]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //비밀번호 변경 성공 시
      const passwordData = {
        currentPassword: formData.currentPassword,
        password: formData.password,
      };

      const response = await axios.post('http://34.64.216.86/api/user/change', passwordData);

      alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.');
      console.log(response.data);
      removeToken();
      removeAccessTokenTime();

      navigate('/login');

      /*
      //Fetcher 사용
      const data: any = await ChangePassword(currentPassword, newPassword);
      
      alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.');
      console.log(data);

      navigate('/login');
      */
    } catch (error) {
      // 비밀번호 변경 실패 시
      console.error('비밀번호 변경에 실패했습니다:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={JoginIllust} alt='아이디찾기 일러스트' />
        </div>

        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>비밀번호 변경</legend>
              <FormHead heading={'비밀번호 변경'} description={'비밀번호를 변경해주세요.'} />
              <div>
                <DefaultInput
                  label='현재 비밀번호'
                  type='password'
                  id='currentPassword'
                  value={formData.currentPassword}
                  error={!validation.currentPassword && formData.currentPassword.length > 0}
                  errorMessage='비밀번호는 8자 이상이어야 합니다.'
                  onChange={handleInputChange}
                />

                <DefaultInput
                  label='새 비밀번호'
                  type='password'
                  id='password'
                  value={formData.password}
                  error={!validation.password && formData.password.length > 0}
                  errorMessage='비밀번호는 8자 이상이어야 합니다.'
                  onChange={handleInputChange}
                />

                <DefaultInput
                  label='비밀번호 확인'
                  type='password'
                  id='passwordConfirm'
                  value={formData.passwordConfirm}
                  error={!validation.passwordConfirm && formData.passwordConfirm.length > 0}
                  errorMessage='비밀번호와 비밀번호 확인이 일치하지 않습니다.'
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <FormButton>
              <button type='submit' disabled={!formValid}>
                변경하기
              </button>
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
