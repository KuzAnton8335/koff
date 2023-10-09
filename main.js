import Navigo from 'navigo';
import 'normalize.css';
import { Catalog } from './modules/Catalog/Catalog';
import { Footer } from './modules/Footer/footer';
import { Header } from './modules/Header/header';
import { Main } from './modules/Main/main';
import { Order } from './modules/Order/order';
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
  const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

  new Header().mount();
  new Main().mount();
  // new Order().mount(new Main().element);
  new Footer().mount();

  api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();


  router.on("/", async () => {
    const product = await api.getProducts();
    new Productlist().mount(new Main().element, product);
    router.updatePageLinks();
  },
    {
      leave(done) {
        new Productlist().unmount();
        done();
      },
      already() {
        console.log("already");
      },
    })
    .on('/category', async ({ params: { slug } }) => {
      const product = await api.getProducts();
      new Productlist().mount(new Main().element, product, slug);
      router.updatePageLinks();
    }, {
      leave(done) {
        new Productlist().unmount();
        done();
      },
    })
    .on('/favorite', async () => {
      const product = await api.getProducts();
      new Productlist().mount(new Main().element, product, 'Избранное');
      router.updatePageLinks();
    }, {
      leave(done) {
        new Productlist().unmount();
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
      new Order().mount(new Main().element);
      console.log('order');
    },
      {
        leave(done) {
          console.log("leave");
          done();
        },
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
