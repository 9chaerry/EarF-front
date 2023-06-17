import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import styles from './CommunitySwiper.module.scss';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import CommunityBanner01 from 'assets/images/comSwiper01.png';
import CommunityBanner02 from 'assets/images/comSwiper02.png';
import CommunityBanner03 from 'assets/images/comSwiper03.png';

const CommunitySwiper = () => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        // install Swiper modules
        direction={'vertical'}
        modules={[Autoplay]}
        // modules={[Navigation, Autoplay]}
        // navigation={true}
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.community}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.board}>
            <img src={CommunityBanner01} alt='' />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.board}>
            <img src={CommunityBanner02} alt='' />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.board}>
            <img src={CommunityBanner03} alt='' />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CommunitySwiper;
