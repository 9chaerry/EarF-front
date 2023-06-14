import styles from './Edit.module.scss';
import { useState, ChangeEvent, useEffect } from 'react';
import Button from 'components/common/Button';
import camera from 'assets/images/camera.png';
import { useNavigate } from 'react-router-dom';
import { userInfo, userInfoChange, userImgChange } from 'api/fetcher';
import defaultProfile from 'assets/icons/UserIcon.svg';
interface FormValues {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: File | null | string;
}

function Edit() {
  const navigate = useNavigate();
  const imgFormData = new FormData();
  const [formData, setFormData] = useState<FormValues>({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { id, name, email, phoneNumber, profileImage }: FormValues = (await userInfo()) as FormValues;
        const userData = {
          id,
          name,
          email,
          phoneNumber,
          profileImage,
        };
        setFormData(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      imgFormData.append('profileImage', formData.profileImage as File);
    }
  };

  const useNavigateToChangePassword = () => {
    navigate('/change_password');
  };

  const handleUserInfoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const { id, name, email, phoneNumber } = formData;
      await userInfoChange(id, name, email, phoneNumber);
      await userImgChange(imgFormData);
      navigate('/mypage/info');
    } catch (error) {
      console.error('수정에 실패했습니다.', error);
    }
  };

  return (
    <div className={styles.edit}>
      <form>
        <div className={styles.profileImageBox}>
          <img src={formData.profileImage ? formData.profileImage : `${defaultProfile}`} alt='프로필' />
          <label htmlFor='profileImage' className={styles.camera}>
            <img src={camera} alt='카메라'></img>
          </label>
          <input
            type='file'
            id='profileImage'
            name='profileImage'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.userInfo}>
          <label htmlFor='id'>아이디</label>
          <input type='text' id='id' name='id' value={formData.id} readOnly />
        </div>
        <div className={styles.userInfo}>
          <label htmlFor='name'>이름</label>
          <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} />
        </div>
        <div className={styles.userInfo}>
          <label htmlFor='email'>이메일</label>
          <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.userInfo}>
          <label htmlFor='phoneNumber'>전화번호</label>
          <input type='tel' id='phoneNumber' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className={styles.buttonContainer}>
          <Button text={'완료'} onClick={handleUserInfoChange} />
          <Button text={'비밀번호 변경하기'} className={'whiteButton'} onClick={useNavigateToChangePassword} />
        </div>
      </form>
    </div>
  );
}

export default Edit;
