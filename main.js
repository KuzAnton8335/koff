import Navigo from 'navigo';
import 'normalize.css';
import { Footer } from './modules/Footer/footer';
import { Header } from './modules/Header/header';
import { Main } from './modules/Main/main';
// import { Order } from './modules/Order/order';
import { Productlist } from './modules/ProductList/productlist';
import { Apiservice } from './services/Apiservice';
import './style.scss';

const productSlider = () => {
  Promise.all([
    import("swiper/modules"),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    new Swiper.default(".product__slider-main", {
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
  });
}


const init = () => {
  const api = new Apiservice();
  new Header().mount();
  new Main().mount();
  // new Order().mount(new Main().element);
  new Footer().mount();


  productSlider();
  const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });
  router.on("/", async () => {
    const product = await api.getProducts();
    new Productlist().mount(new Main().element, product);
  },
    {
      leave(done) {
        console.log("leave");
        done();
      },
      already() {
        console.log("already");
      },
    })
    .on('/category', () => {
      new Productlist().mount(new Main().element, [1, 2, 3, 4, 5, 6], 'Категории');
    }, {
      leave(done) {
        console.log("leave");
        done();
      },
    })
    .on('/favorite', () => {
      new Productlist().mount(new Main().element, [1, 2, 3,], 'Избранное');
    }, {
      leave(done) {
        console.log("leave");
        done();
      },
    })
    .on('/search', () => {
      console.log('search');
    })
    .on('/product/:id', (obj) => {
      console.log(obj);
    })
    .on('/cart', () => {
      console.log('cart');
    })
    .on('/order', () => {

      console.log('order');
    })
    .notFound(() => {
      new Main().element.innerHTML = `<h2>Страница не найдена</h2>
      <p>Через 5 секунд вы будуте перенаправлены <a href="/">на главную страницу</a></p>
      `;
      setTimeout(() => {
        router.navigate("/");
      }, 5000);
    })
  router.resolve();
}
init();
