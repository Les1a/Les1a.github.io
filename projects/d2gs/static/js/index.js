document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.results-carousel')) {
    bulmaCarousel.attach('.results-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      pagination: true,
      navigation: true
    });
  }
});
