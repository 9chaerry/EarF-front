import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper';
import 'swiper/scss';
import 'swiper/css/effect-coverflow';
import BoastItem from './BoastItem';
import styles from './BoastSwiper.module.scss';

function BoastSwiper() {
  return (
    <>
      <Swiper
        dir={'rtl'}
        // direction={'vertical'}
        speed={800}
        slidesPerView={2}
        spaceBetween={30}
        autoHeight={true}
        slideToClickedSlide={true}
        mousewheel={true}
        centeredSlides={true}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 10,
          stretch: 700,
          depth: 150,
          modifier: 1,
          slideShadows: !1,
        }}
        initialSlide={0}
        modules={[EffectCoverflow, Mousewheel]}
        preventClicksPropagation={true}
        className={styles.swiperContainer}
      >
        <SwiperSlide>
          <BoastItem />
        </SwiperSlide>
        <SwiperSlide>
          <BoastItem />
        </SwiperSlide>
        <SwiperSlide>
          <BoastItem />
        </SwiperSlide>
        <SwiperSlide>
          <BoastItem />
        </SwiperSlide>
        <SwiperSlide>
          <BoastItem />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default BoastSwiper;
