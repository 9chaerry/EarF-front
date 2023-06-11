import styles from './QuestionPostingBoard.module.scss';

function QuestionPostingBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <span>커뮤니티</span>
        <span>질문해요</span>
      </div>
    </div>
  );
}

export default QuestionPostingBoard;
