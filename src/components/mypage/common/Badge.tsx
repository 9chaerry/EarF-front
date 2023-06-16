import { useState, useEffect } from 'react';
import styles from './Badge.module.scss';
import BadgeModal from './BadgeModal';
import BadgeList from './BadgeList';
import { RootState } from 'store';
import Title from 'components/common/PageTitle';
import { useSelector } from 'react-redux';

function Badge() {
  const selectedBadge = useSelector((state: RootState) => state.selectedBadge);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const badgeList = BadgeList();

  // Edit 모달
  const handleShowModal = (index?: number): void => {
    if (typeof index !== 'undefined') setSelectedImageIndex(index);
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <Title title='뱃지관리' />

      <div className={styles.contents}>
        <div>
          {badgeList.map((badge, index) => (
            <div
              key={index}
              className={badge.isGet ? styles.items : `${styles.items} ${styles.notAcquired}`}
              onClick={() => handleShowModal(index)}
            >
              {badge.type === selectedBadge.badge ? <div className={styles.checked}>대표뱃지</div> : null}
              <img src={badge.url} alt='뱃지 이미지' />
              <div className={styles.badgeName}>
                <p>{badge.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && selectedImageIndex !== null && (
        <BadgeModal
          type={badgeList[selectedImageIndex].type}
          name={badgeList[selectedImageIndex].name}
          imgSrc={badgeList[selectedImageIndex].url}
          isGet={badgeList[selectedImageIndex].isGet}
          info={badgeList[selectedImageIndex].info}
          handleShowModal={handleShowModal}
        />
      )}
    </div>
  );
}

export default Badge;
