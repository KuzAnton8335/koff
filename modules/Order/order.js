import { addContainer } from "../addContainer";

export class Order {
  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('order');
      this.containerElement = addContainer(this.element, "order__container");
      this.isMounted = false;
    }
    return Order.instance
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const orderContent = this.getOrderContent();
    this.containerElement.append(orderContent);
    document.body.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getOrderContent() {
    const orderContent = document.createElement('div');
    orderContent.classList.add('order__content');
    const orderTopInfo = this.getorderTopInfo();
    const orderTableInfo = this.getorderTableInfo();
    orderContent.appendChild(orderTopInfo);
    orderContent.appendChild(orderTableInfo);
    return orderContent;
  }

  getorderTopInfo() {
    const orderTopInfo = document.createElement('div');
    orderTopInfo.classList.add('order__top-info');
    orderTopInfo.innerHTML =
      `<h2 class="order__title">Заказ успешно размещен </h2>
    <p class="order__totel-sum">20&nbsp;000&nbsp;₽</p>
    <p class="order__number">№43435</p>`;
    return orderTopInfo;
  }

  getorderTableInfo() {
    const orderTableInfo = document.createElement('div');
    orderTableInfo.classList.add('order__table-info');
    orderTableInfo.innerHTML = `
    <h3 class="order__subtitle">Данные доставки</h3>
    <table class="order__table table">
      <tr class="order__table-row">
        <td class="order__table-field">Получатель</td>
        <td class="order__table-value">Иванов Петр Александрович</td>
      </tr>
      <tr class="order__table-row">
        <td class="order__table-field">Телефон</td>
        <td class="order__table-value">+7 (737) 346 23 00</td>
      </tr>
      <tr class="order__table-row">
        <td class="order__table-field">E-mail</td>
        <td class="order__table-value">Ivanov84@gmail.com</td>
      </tr>
      <tr class="order__table-row">
        <td class="order__table-field">Адрес доставки</td>
        <td class="order__table-value">Москва, ул. Ленина, 21, кв. 33</td>
      </tr>
      <tr class="order__table-row">
        <td class="order__table-field">Способ оплаты</td>
        <td class="order__table-value">Картой при получении</td>
      </tr>
      <tr class="order__table-row">
        <td class="order__table-field">Способ получения</td>
        <td class="order__table-value">Доставка</td>
      </tr>
    </table>
    <a href="index.html" class="order__links">На главную</a>
    `
    return orderTableInfo;
  }


}
