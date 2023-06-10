import styles from './BadgeModal.module.scss';
import { ReactComponent as Exit } from 'assets/icons/Exit.svg';
import Button from 'components/common/Button';
import { checkedBadgeChange } from 'api/fetcher';
interface BadgeModalProps {
  type: string;
  name: string;
  imgSrc: string;
  isGet: boolean;
  info: string;
  onClick: () => void;
}

function BadgeModal({ type, name, imgSrc, isGet, info, onClick }: BadgeModalProps) {
  const handleCheckedBadge = async () => {
    try {
      await checkedBadgeChange(type);
    } catch (error) {
      console.error('대표 뱃지 변경 실패', error);
    }
  };
  return (
    <div className={styles.modalBox}>
      <Exit className={styles.exitButton} onClick={onClick} />
      <div className={styles.modalContents}>
        <img src={imgSrc} alt='이미지' />
        <p className={styles.name}>{name}</p>
        <p className={styles.info}>{info}</p>
        <Button
          text='대표 뱃지 설정'
          className={isGet ? '' : 'whiteButton'}
          disabled={!isGet}
          onClick={handleCheckedBadge}
        />
      </div>
    </div>
  );
}

export default BadgeModal;
