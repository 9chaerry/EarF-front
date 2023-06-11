import { useRef } from 'react';
import styles from './PostingContent.module.scss';
function PostingContent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  return (
    <form className={styles.contentContainer}>
      <input type='text' placeholder='제목을 입력하세요.' className={styles.title} />
      <textarea
        rows={1}
        placeholder='상세한 내용을 입력해주세요.'
        className={styles.content}
        onChange={autoResizeHeight}
        ref={textareaRef}
      />
    </form>
  );
}
export default PostingContent;
