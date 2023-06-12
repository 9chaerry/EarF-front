import Title from 'components/community/common/Title';
import Board from 'components/community/questionBoard/Board';
import RightSideNav from 'components/community/common/RightSideNav';
import LeftSideNav from 'components/community/common/LeftSideNav';
import styles from './Community.module.scss';
import ScrollToTopOnPageLoad from 'components/common/ScrollTopOnPageLoad';

function Community() {
  return (
    <div className={styles.container}>
      <ScrollToTopOnPageLoad />
      <Title />
      <section className={styles.main}>
        <LeftSideNav />
        <Board />
        <RightSideNav />
      </section>
    </div>
  );
}

export default Community;
