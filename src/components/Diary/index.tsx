import { useRef, useState, useEffect } from 'react';
import inputDefaultImg from 'assets/images/inputDefaultImg.png';

import { GetSelectedDateState } from 'services/calendarService';

import DiaryButton from './common/DiaryButton';
import ShareButton from './common/ShareButton';
import CheckboxComponent from './common/CheckboxComponent';
import { TFormData, CheckboxesState } from 'types/types';

import {
  HandleDiarySubmit,
  HandleEachValue,
  HandleSharedClick,
  HandleImageChange,
  HandleCheckboxChange,
} from 'services/diaryService';

import styles from './styles.module.scss';

export default function Diary() {
  const selectedValue = GetSelectedDateState();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(inputDefaultImg);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<TFormData>({
    tag: [],
    file: null,
    title: '',
    content: '',
    shareStatus: false,
  });

  const [checkboxes, setCheckboxes] = useState<CheckboxesState>({
    tag1: false,
    tag2: false,
    tag3: false,
  });

  useEffect(() => {
    HandleEachValue('tag', getSelectedCheckboxes(), setFormData);
  }, [checkboxes]);

  const handleImageClick = () => {
    hiddenFileInput.current?.click();
  };

  const getSelectedCheckboxes = (): string[] => {
    return Object.keys(checkboxes).filter((checkbox: string) => checkboxes[checkbox]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tagContainer}>
        <span>태그</span>
        <div>
          <CheckboxComponent
            label='텀블러'
            isChecked={checkboxes.tag1}
            onChange={() => HandleCheckboxChange('tag1', checkboxes, setCheckboxes)}
            tag='tag1'
          />
          <CheckboxComponent
            label='대중교통'
            isChecked={checkboxes.tag2}
            onChange={() => HandleCheckboxChange('tag2', checkboxes, setCheckboxes)}
            tag='tag2'
          />
          <CheckboxComponent
            label='장바구니'
            isChecked={checkboxes.tag3}
            onChange={() => HandleCheckboxChange('tag3', checkboxes, setCheckboxes)}
            tag='tag3'
          />
        </div>
      </div>
      <div className={styles.recordContainer}>
        <span>기록</span>
        <div className={styles.recondWrapper}>
          <div className={styles.photo}>
            <img alt='selectimg' src={selectedImage} className={styles.defaultImg} onClick={handleImageClick} />
            <input
              placeholder='사진'
              type='file'
              className={styles.inputImg}
              ref={hiddenFileInput}
              style={{ display: 'none' }}
              onChange={(event) => HandleImageChange(event, setSelectedImage, setFormData)}
            />
          </div>

          <div className={styles.text}>
            <input
              placeholder='행동 한마디'
              className={styles.inputContent}
              maxLength={20}
              spellCheck={false}
              onChange={(event) => {
                if (event.target.value.length <= 20) {
                  HandleEachValue('title', event.target.value, setFormData);
                }
              }}
            />
            <textarea
              placeholder='오늘 어떤 행동을 했나요 ?'
              spellCheck={false}
              className={styles.inputContent}
              rows={5}
              onChange={(event) => {
                HandleEachValue('content', event.target.value, setFormData);
              }}
            />
          </div>

          <div className={styles.shareButtonBox}>
            <ShareButton
              toggle={formData.shareStatus}
              onClick={() => HandleSharedClick('shareStatus', !formData.shareStatus, setFormData)}
            />
          </div>
          <div className={styles.postButtonBox}>
            <DiaryButton text='등록하기' onClick={() => HandleDiarySubmit(formData, selectedValue)} />
          </div>
        </div>
      </div>
    </div>
  );
}
