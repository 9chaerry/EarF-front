import styles from './FindPassword.module.scss';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FormHead from 'components/User/FormHead';
import FormButton from 'components/User/FormButton';
import { DefaultInput } from 'components/User/DefaultInput';
import { validateField } from 'components/User/validation';

// import { FindPassword } from 'components/common/Fetcher';
import JoginIllust from '../assets/images/JoinIllust.jpg';

interface FormData {
  email: string;
}

function FindPassword() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const [validation, setValidation] = useState<{ [key: string]: boolean }>({
    email: false,
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
      email: validateField('email', formData.email, formData),
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
      const response = await axios.post('http://34.64.216.86/api/user/reset', {
        email: formData.email,
      });

      alert(response.data);

      /*
      //Fetcher 사용
      const data: any = await FindPassword(email);
      alert(data);
      */
    } catch (error) {
      alert('이메일 발송 중 오류가 발생했습니다.');
      console.log(`이메일 발송 중 오류가 발생했습니다. ${error}`);
    }

    console.log('Send email to:', formData.email);
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
              <legend>비밀번호 찾기</legend>
              <FormHead heading={'비밀번호 찾기'} description={'이메일 입력시, 임시비밀번호가 발송됩니다.'} />
              <div>
                <DefaultInput
                  label='이메일'
                  type='text'
                  id='email'
                  value={formData.email}
                  error={!validation.email && formData.email.length > 0}
                  errorMessage='유효한 이메일 주소를 입력해주세요.'
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <FormButton>
              <Link to='/login'>로그인</Link>
              <button type='submit' disabled={!formValid}>
                비밀번호 발송
              </button>
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
