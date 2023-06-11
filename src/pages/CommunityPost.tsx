import Title from 'components/community/common/Title';
import RightSideNav from 'components/community/common/RightSideNav';
import LeftSideNav from 'components/community/common/LeftSideNav';
import QuestionPostingBoard from 'components/community/questionPost/QuestionPostingBoard';
import styles from './Community.module.scss';

function CommunityPost() {
  return (
    <div className={styles.container}>
      <Title />
      <section className={styles.main}>
        <LeftSideNav />
        <QuestionPostingBoard />
        <RightSideNav />
      </section>
    </div>
  );
}

export default CommunityPost;
