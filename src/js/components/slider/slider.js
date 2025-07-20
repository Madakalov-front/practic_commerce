
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'

export const BannerSwiper = () => {
    const bannerSwiper = new Swiper('.swiper-banner', {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        resizeObserver: true, 
        observer: true,
    })
    return bannerSwiper;
};