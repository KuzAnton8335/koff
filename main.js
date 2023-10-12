import Navigo from 'navigo';
import 'normalize.css';
import { Catalog } from './modules/Catalog/Catalog';
import { Footer } from './modules/Footer/footer';
import { Header } from './modules/Header/header';
import { Main } from './modules/Main/main';
import { Order } from './modules/Order/order';
import { Productlist } from './modules/ProductList/productlist';
import { defaultPage } from './modules/defaultPage/defaultPage';
import { Apiservice } from './services/Apiservice';
import { FavoriteService } from './services/StorageServices';
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
  new Footer().mount();

  api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();


  router.on("/", async () => {
    const products = await api.getProducts();
    new Productlist().mount(new Main().element, products);
    router.updatePageLinks();
  },
    {
      leave(done) {
        new Productlist().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      },
    })
    .on('/category', async ({ params: { slug, page } }) => {
      const { data: products, pagination } = await api.getProducts({ category: slug, page: page || 1 });
      new Productlist().mount(new Main().element, products, slug);
      new Pagination().mount(new Productlist().containerElement).update(pagination);
      router.updatePageLinks();
    }, {
      leave(done) {
        new Productlist().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/favorite', async () => {
      const favorite = new FavoriteService().get();
      const { data: product } = await api.getProducts({ list: favorite.join(",") });
      new Productlist().mount(new Main().element, product, 'Избранное',
        "Вы ничего не добавили в избранное,пожалуйста,добавьте что-нибудь...");
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
      router.updatePageLinks();
      console.log('order');
    },
      {
        leave(done) {
          new Order().unmount();
          done();
        },
      })
    .notFound(() => {
      new defaultPage().mount(new Main().element);
      router.updatePageLinks();
      setTimeout(() => {
        router.navigate("/");
      }, 5000);
    },
      {
        leave(done) {
          new defaultPage().unmount();
          done();
        }
      }
    )
  router.resolve();
}
init();
