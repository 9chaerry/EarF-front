import { useState } from 'react';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import styles from './HeartReaction.module.scss';

function HeartReaction() {
  const token = localStorage.getItem('token');
  const [likeIt, setLikeIt] = useState(false);
  const [likeItNumber, setLikeItNumber] = useState(0);

  const handleLikeIt = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!token) {
      return; // 클릭 동작을 막음
    }

    setLikeIt((prevLikeIt) => !prevLikeIt);
    setLikeItNumber((prevNumber) => (likeIt ? prevNumber - 1 : prevNumber + 1));
  };

  const containerClasses = `${styles.reactionContainer} ${likeIt ? styles.active : ''}`;

  return (
    <div className={containerClasses} onClick={handleLikeIt}>
      <Heart />
      <span className={styles.reactionNumber}>{likeItNumber}</span>
    </div>
  );
}

export default HeartReaction;
