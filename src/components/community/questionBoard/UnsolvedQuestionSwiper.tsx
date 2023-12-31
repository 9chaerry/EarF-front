import { useGetNoCommentQuery } from 'api/communityApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import UnsolvedQuestion from './UnsolvedQuestion';
import styles from './UnsolvedQuestionSwiper.module.scss';

function UnsolvedQuestionSwiper() {
  const { data: noCommentData } = useGetNoCommentQuery();

  const swiperParams = {
    spaceBetween: 5,
    autoHeight: true,
    slidesPerView: 2,
    className: styles.unsolvedSwiper,
    autoplay: {
      delay: 3000,
    },
    loop: true,
    loopAdditionalSlides: 1,
    // allowTouchMove: false,
  };
  return (
    <div className={styles.unsolved}>
      <span>답변을 기다리고 있어요</span>
      <Swiper
        speed={600}
        spaceBetween={5}
        autoHeight={true}
        slidesPerView={2}
        className={styles.unsolvedSwiper}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        modules={[Autoplay]}
      >
        {noCommentData &&
          noCommentData?.map((post) => (
            <SwiperSlide key={post._id}>
              <UnsolvedQuestion
                _id={post._id}
                title={post.title}
                createdAt={post.createdAt}
                name={post.name}
                profileImage={post.profileImage}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default UnsolvedQuestionSwiper;
