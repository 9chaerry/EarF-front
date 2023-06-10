import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import Button from 'components/common/Button';
import Modal from './Modal';
import { userInfo } from 'api/fetcher';

function Main() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [user, setUser] = useState({});

  // Edit 모달
  const handleShowEditModal = (): void => {
    setShowEditModal((prevState) => !prevState);
  };
  // Remove 모달
  const handleShowRemoveModal = (): void => {
    setShowRemoveModal((prevState) => !prevState);
  };

  // Edit 페이지 이동
  const handleNavigateToEdit = (): void => {
    window.location.href = '/mypage/edit';
  };

  // 회원 탈퇴
  const handleRemoveAccount = (): void => {
    // api 요청
    console.log('회원 탈퇴 버튼 클릭');
  };

  // 유저 정보 불러오기
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const userData = await userInfo();
  //       setUser(userData);
  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     }
  //   };
  //   fetchUserInfo();
  // }, []);

  return (
    <div className={styles.main}>
      {showEditModal && <Modal handleShowModal={handleShowEditModal} handleNavigateToEdit={handleNavigateToEdit} />}
      {showRemoveModal && <Modal handleShowModal={handleShowRemoveModal} handleNavigateToEdit={handleRemoveAccount} />}
      <div className={styles.profile}>
        <div className={styles.imgContainer}></div>
        {/* <div className={styles.userId}>{userData.id}</div> */}
      </div>
      <div className={styles.dataFiledSet}>
        <div className={styles.dataFiled}>
          <div className={styles.fixedData}>이름</div>
          {/* <div className={styles.fetchData}>{userData.name}</div> */}
        </div>
        <div className={styles.dataFiled}>
          <div className={styles.fixedData}>이메일</div>
          {/* <div className={styles.fetchData}>{userData.email}</div> */}
        </div>
        <div className={styles.dataFiled}>
          <div className={styles.fixedData}>전화번호</div>
          {/* <div className={styles.fetchData}>{userData.phoneNumber}</div> */}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button text={'수정하기'} onClick={handleShowEditModal} />
        <Button text={'회원탈퇴'} className={'whiteButton'} onClick={handleShowRemoveModal} />
      </div>
    </div>
  );
}

export default Main;
