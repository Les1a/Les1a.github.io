window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  if (document.querySelector('.results-carousel')) {
    bulmaCarousel.attach('.results-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      pagination: true,
      navigation: true
    });
  }

  if (typeof bulmaSlider !== 'undefined') {
    bulmaSlider.attach();
  }
});
