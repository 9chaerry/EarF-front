import { useRef, ChangeEvent } from 'react';
import styles from './PostingContent.module.scss';

type PostingContentProps = {
  title: string;
  content: string;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function PostingContent({ title, content, onTitleChange, onContentChange }: PostingContentProps) {
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
      <input
        type='text'
        value={title}
        onChange={onTitleChange}
        placeholder='제목을 입력하세요.'
        className={styles.title}
        spellCheck='false'
      />
      <textarea
        rows={1}
        placeholder='상세한 내용을 입력해주세요.'
        value={content}
        className={styles.content}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          autoResizeHeight();
          onContentChange(event);
        }}
        spellCheck='false'
        ref={textareaRef}
      />
    </form>
  );
}
export default PostingContent;
