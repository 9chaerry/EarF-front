import styles from './BadgeModal.module.scss';
import { ReactComponent as Exit } from 'assets/icons/Exit.svg';
import Button from 'components/common/Button';
import { checkedBadgeChange } from 'api/fetcher';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedBadge } from 'store/selectedBadgeSlice';

interface BadgeModalProps {
  type: string;
  name: string;
  imgSrc: string;
  isGet: boolean;
  info: string;
  handleShowModal: () => void;
}

function BadgeModal({ type, name, imgSrc, isGet, info, handleShowModal }: BadgeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef && !modalRef.current?.contains(e.target as Node)) {
      handleShowModal();
    }
  };

  const handleCheckedBadge = async () => {
    try {
      await checkedBadgeChange(type);
      localStorage.setItem('badge', type);
      const badge = type;
      dispatch(setSelectedBadge({ badge }));
      handleShowModal();
    } catch (error) {
      console.error('대표 뱃지 변경 실패', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBox} ref={modalRef}>
        <Exit className={styles.exitButton} onClick={handleShowModal} />
        <div className={styles.modalContents}>
          <img src={imgSrc} alt='이미지' />
          <p className={styles.name}>{name}</p>
          <p className={styles.info}>{info}</p>
          <Button
            text='대표 뱃지 설정'
            className={isGet ? '' : 'nonCursor'}
            disabled={!isGet}
            onClick={handleCheckedBadge}
          />
        </div>
      </div>
    </div>
  );
}

export default BadgeModal;
