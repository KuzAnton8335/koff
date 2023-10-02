import 'normalize.css';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import './style.scss';
// import Swiper styles
import 'swiper/css';

// swiper slider
const swiperThumbnails = new Swiper(".product__slider-thumbnails", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
new Swiper(".product__slider-main", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".product__arrow-next",
    prevEl: ".product__arrow-prev",
  },
  modules: [Navigation, Thumbs],
  thumbs: {
    swiper: swiperThumbnails,
  },
});





