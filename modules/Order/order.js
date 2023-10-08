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

    const orderContent = this.getContent();
    this.containerElement.append(orderContent);
    document.body.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getContent() {
    const orderContent = document.createElement('div');
    orderContent.classList.add('order__content');
    const orderTopInfo = this.getTopinfo();
    const orderTableInfo = this.getTableinfo();
    getContent.append(orderTopInfo, orderTableInfo);
    return orderContent;
  }

  getTopinfo() {
    const orderTopInfo = document.createElement('div');
    orderTopInfo.classList.add('order__table-info');
    const orderTitle = this.getOrdertitle();
    const orderTotalSum = this.getOrderTotalsum();
    const orderNumber = this.getOrdernumber();

    orderTopInfo.append(orderTitle, orderTotalSum, orderNumber);
    return orderTopInfo;
  }

  getOrdertitle() {
    const orderTitle = document.createElement('h2');
    orderTitle.classList.add('order__title');
    orderTitle.textContent = 'Заказ успешно размещен';
    return orderTitle;
  }

  getOrderTotalsum() {
    const orderTotalSum = document.createElement('p');
    orderTotalSum.classList.add('order__totel-sum');
    orderTotalSum.textContent = '20&nbsp;000&nbsp;₽';
    return orderTotalSum;
  }

  getOrdernumber() {
    const orderNumber = document.createElement('p');
    orderNumber.classList.add('order__number');
    orderNumber.textContent = '№43435';
    return orderNumber;
  }
}
