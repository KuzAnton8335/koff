import logoImg from '/img/logo.svg';

export const getLogo = (mainClassName) => {
  const logo = document.createElement('a');
  logo.classList.add(`${mainClassName}__link-logo`);
  logo.href = '/';
  const imgLogo = new Image();
  imgLogo.classList.add(`${mainClassName}__logo`);
  imgLogo.src = logoImg;
  imgLogo.alt = 'логотип мебельного маркета Koff';
  logo.append(imgLogo);

  return logo;
}
