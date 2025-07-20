export const handlerMenu = () => {
    const menu = document.querySelector('.nav');
    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.nav__close');

    if (!menu || !burger || !close) return null;

    const toggleShowMenu = () => {
        menu.classList.toggle('nav--show');
    }

    burger.addEventListener('click', toggleShowMenu)
    close.addEventListener('click', toggleShowMenu)

}