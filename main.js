import Navigo from 'navigo';
import 'normalize.css';
import { BreadCrumbs } from './features/BreadCrumbs/breadCrumbs';
import { Pagination } from './features/Pagination/Pagination';
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

export const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

const init = () => {
  const api = new Apiservice();


  new Header().mount();
  new Main().mount();
  new Footer().mount();

  productSlider();


  router.on("/", async () => {
    new Catalog().mount(new Main().element);
    const products = await api.getProducts();
    new Productlist().mount(new Main().element, products);
    router.updatePageLinks();
  },
    {
      leave(done) {
        new Productlist().unmount();
        new Catalog().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      },
    })
    .on('/category', async ({ params: { slug, page = 1 } }) => {
      new Catalog().mount(new Main().element);
      const { data: products, pagination } = await api.getProducts({
        category: slug,
        page: page,
      });
      new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
      new Productlist().mount(new Main().element, products, slug);
      new Pagination().mount(new Productlist().containerElement)
        .update(pagination);
      router.updatePageLinks();
    }, {
      leave(done) {
        new BreadCrumbs().unmount();
        new Productlist().unmount();
        new Catalog().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/favorite', async ({ params }) => {
      new Catalog().mount(new Main().element);
      const favorite = new FavoriteService().get();
      const { data: product, pagination } = await api.getProducts({
        list: favorite.join(","),
        page: params?.page || 1
      });
      new BreadCrumbs().mount(new Main().element, [{ text: 'Избранное' }]);
      new Productlist().mount(new Main().element, product, 'Избранное',
        "Вы ничего не добавили в избранное,пожалуйста,добавьте что-нибудь...");
      new Pagination().mount(new Productlist().containerElement).update(pagination);
      router.updatePageLinks();
    }, {
      leave(done) {
        new BreadCrumbs().unmount();
        new Productlist().unmount();
        new Catalog().unmount();
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
