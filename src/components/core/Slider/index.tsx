import { FCC } from '@/helpers/FCC';
import React from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import './styles.css';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
interface Props {
  withOutSideArrow?: boolean;
}
const SwiperSlider: FCC<Props> = ({ withOutSideArrow, children }) => {
  const [swiper, setSwiper] = React.useState<any>();
  const prevRef = React.useRef<any>();
  const nextRef = React.useRef<any>();
  React.useEffect(() => {
    if (swiper) {
      console.log('Swiper instance:', swiper);
      swiper?.navigation?.init();
      swiper?.navigation?.update();
    }
  }, [swiper]);
  return (
    <div className="App w-full">
      {withOutSideArrow && (
        <div className="carousel-container">
          <div className="swiper-button" ref={prevRef}>
            <BiSkipPrevious />
          </div>
          <Swiper
            spaceBetween={0}
            slidesPerView={2}
            onSlideChange={() => console.log('slide change')}
            navigation={{
              prevEl: prevRef?.current,
              nextEl: nextRef?.current,
            }}
            modules={[Navigation]}
            className="swiper mySwiper"
            updateOnWindowResize
            observer
            observeParents
            initialSlide={0}
            onSwiper={setSwiper}
          >
            {children}
          </Swiper>
          <div className="swiper-button" ref={nextRef}>
            <BiSkipNext />
          </div>
        </div>
      )}
      {!withOutSideArrow && (
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          updateOnWindowResize
          observer
          observeParents
          initialSlide={0}
          className="inside-arrow-swipper"
          navigation
          modules={[Navigation]}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {children}
        </Swiper>
      )}
    </div>
  );
};

export default SwiperSlider;
