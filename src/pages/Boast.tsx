import Title from 'components/community/common/Title';
import RightSideNav from 'components/community/common/RightSideNav';
import LeftSideNav from 'components/community/common/LeftSideNav';
import Board from 'components/community/boastBoard/Board';
import styles from './Community.module.scss';

function Boast() {
  return (
    <div className={styles.container}>
      <Title />
      <section className={styles.main}>
        <LeftSideNav />
        <Board />
        <RightSideNav />
      </section>
    </div>
  );
}

export default Boast;
