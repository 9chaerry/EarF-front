import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/css/navigation';
import UnsolvedQuestion from './UnsolvedQuestion';
import styles from './UnsolvedQuestionSwiper.module.scss';

function UnsolvedQuestionSwiper() {
  const swiperParams = {
    spaceBetween: 20,
    autoHeight: true,
    slidesPerView: 2,
    className: styles.unsolvedSwiper,
    autoplay: {
      delay: 3000,
    },
    loop: true,
    loopAdditionalSlides: 1,
    allowTouchMove: false,
    navigation: true,
    modules: [Navigation],
  };
  return (
    <div className={styles.unsolved}>
      <span>답변을 기다리고 있어요</span>
      <Swiper {...swiperParams}>
        <SwiperSlide>
          <UnsolvedQuestion />
        </SwiperSlide>
        <SwiperSlide>
          <UnsolvedQuestion />
        </SwiperSlide>
        <SwiperSlide>
          <UnsolvedQuestion />
        </SwiperSlide>
        <SwiperSlide>
          <UnsolvedQuestion />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default UnsolvedQuestionSwiper;
