import styles from './Join.module.scss';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import FormHead from 'components/User/FormHead';
import FormButton from 'components/User/FormButton';
import { DefaultInput } from 'components/User/DefaultInput';
import { validateField } from 'components/User/validation';

import JoginIllust from '../assets/images/JoinIllust.jpg';

interface FormData {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  phone: string;
}

const Join: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
  });

  const [validation, setValidation] = useState<{ [key: string]: boolean }>({
    id: false,
    password: false,
    passwordConfirm: false,
    name: false,
    email: false,
    phone: false,
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
      id: validateField('id', formData.id, formData),
      password: validateField('password', formData.password, formData),
      passwordConfirm: validateField('passwordConfirm', formData.passwordConfirm, formData),
      name: validateField('name', formData.name, formData),
      email: validateField('email', formData.email, formData),
      phone: validateField('phone', formData.phone, formData),
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
      const userData = {
        id: formData.id,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
      };

      console.log(userData);
      const response = await axios.post('http://34.64.216.86/api/user/register', userData);

      console.log('회원가입에 성공했습니다:', response.data);
      alert('회원가입에 성공했습니다. 로그인 해주세요!');

      navigate('/login');
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={JoginIllust} alt='회원가입 일러스트' />
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>회원가입</legend>
              <FormHead heading={'회원가입'} description={'실천하고, 기록하고, 공유해보세요!'} showLoginLink={true} />
              <div>
                <DefaultInput
                  label='아이디'
                  type='text'
                  id='id'
                  value={formData.id}
                  error={!validation.id && formData.id.length > 0}
                  errorMessage='아이디는 영어와 숫자의 조합으로 8자 이상이어야 합니다.'
                  onChange={handleInputChange}
                />
                <DefaultInput
                  label='비밀번호'
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

                <DefaultInput
                  label='이름'
                  type='text'
                  id='name'
                  value={formData.name}
                  error={!validation.name && formData.name.length > 0}
                  errorMessage='이름은 2자 이상이어야 합니다.'
                  onChange={handleInputChange}
                />

                <DefaultInput
                  label='이메일'
                  type='text'
                  id='email'
                  value={formData.email}
                  error={!validation.email && formData.email.length > 0}
                  errorMessage='유효한 이메일 주소를 입력해주세요.'
                  onChange={handleInputChange}
                />

                <DefaultInput
                  label='전화번호'
                  type='text'
                  id='phone'
                  value={formData.phone}
                  error={!validation.phone && formData.phone.length > 0}
                  errorMessage='전화번호는 010-1234-5678 형식으로 입력해주세요.'
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>

            <FormButton>
              <button type='submit' disabled={!formValid}>
                가입하기
              </button>
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
