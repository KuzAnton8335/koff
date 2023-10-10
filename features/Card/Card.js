import { API_URL } from "../../const";
import { CartButton } from "../CartButton/CartButton";
import { LikeButton } from "../LikeButton/LikeButton";

export class Card {
  constructor({ id, image, title, price }) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.CartButton = new CartButton('card__btn', 'В корзину');
    this.likeButton = new LikeButton('card__favorit');
  }

  create() {
    const article = document.createElement('article');
    article.classList.add('goods__card', 'card');

    const link = document.createElement('a');
    link.classList.add('card__link', 'card__link-img');
    link.href = `/product/${this.id}`;

    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = `${API_URL}${this.image}`;
    img.alt = this.title;
    link.append(img);

    const info = document.createElement('div');
    info.classList.add('card__info');

    const title = document.createElement('h3');
    title.classList.add('card__title');

    const linkTitle = document.createElement('a');
    linkTitle.classList.add('card__link');
    linkTitle.href = `/product/${this.id}`;
    linkTitle.textContent = this.title;
    title.append(linkTitle);

    const price = document.createElement('p');
    price.classList.add('card__price');
    price.innerHTML = `${this.price.toLocaleString()}&nbsp;P`;
    info.append(title, price);

    const btnCart = this.CartButton.create(this.id);
    const btnFavorite = this.likeButton.create(this.id);

    article.append(link, info, btnCart, btnFavorite);

    return article;
  }
}


// getHTMLTemplateListItem({ id, images: [image], name: title, price }) {
//   return `<article class="goods__card card">
//   <a href="/product/${id}" class="card__link card__link-img">
//     <img src="${API_URL}${image}" alt="${title}" class="card__img">
//   </a>
//   <div class="card__info">
//     <h3 class="card__title">
//       <a href="/product/${id}" class="card__link">
//         ${title}
//       </a>
//     </h3>
//     <p class="card__price">${price.toLocaleString()}&nbsp;P</p>
//   </div>
//   <button class="card__btn" data-id="${id}">В корзину</button>
//   <button class="card__favorit" data-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//       viewBox="0 0 16 16" >
//       <path
//         d="M8.41334 13.8733C8.18668 13.9533 7.81334 13.9533 7.58668 13.8733C5.65334 13.2133 1.33334 10.46 1.33334 5.79332C1.33334 3.73332 2.99334 2.06665 5.04001 2.06665C6.25334 2.06665 7.32668 2.65332 8.00001 3.55998C8.67334 2.65332 9.75334 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41334 13.8733Z"
//          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
//     </svg>
//   </button>
// </article>`
// }
