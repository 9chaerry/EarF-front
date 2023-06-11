import Title from 'components/community/common/Title';
import RightSideNav from 'components/community/common/RightSideNav';
import LeftSideNav from 'components/community/common/LeftSideNav';
import styles from './Community.module.scss';
import EditQuestionPostingBoard from 'components/community/questionPosting/EditQuestionPostingBoard';

function EditCommunityPosting() {
  return (
    <div className={styles.container}>
      <Title />
      <section className={styles.main}>
        <LeftSideNav />
        <EditQuestionPostingBoard />
        <RightSideNav />
      </section>
    </div>
  );
}

export default EditCommunityPosting;
