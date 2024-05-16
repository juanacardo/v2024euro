let
  regs =
[
  'avstria',
  'belgia',
  'bolgaria',
  'vengria',
  'germania',
  'grecia',
  'dania',
  'irlandia',
  'ispania',
  'italia',
  'kipr',
  'latvia',
  'litva',
  'lyksemburg',
  'malta',
  'niderlandi',
  'polsha',
  'portugalia',
  'ruminia',
  'slovenia',
  'slovakia',
  'chehia',
  'francia',
  'finlandia',
  'horvatia',
  'shvecia',
  'estonia'
];
let regions = [];
let reg_info_btn_prev = '.map__button.map__button--prev';
let reg_info_btn_next = '.map__button.map__button--next';
let articles_slider_btn_prev = '.slider__button.slider__button--prev';
let articles_slider_btn_next = '.slider__button.slider__button--next';
let map = '.map__svg';
let info_carousel = '.region-info';
let articles_carousel = '.slider';
let width = $(this).width();

// Реинициализация на изменение ширины
$(window).on('resize', function () {
  // articles_slider_ini($(this).width());
});

$(document)
    .ready(function () {
      // Работа табов-переключателей
      // Получаем все заголовки табов
      let tabButtons = $('.tabs__button');

      // Добавляем обработчик события клика на каждый заголовок таба
      tabButtons.click(function () {
        // Удаляем класс active у всех заголовков табов
        $('.tabs__button').removeClass('tabs__button--active');

        // Добавляем класс active к выбранному заголовку таба
        $(this).addClass('tabs__button--active');
        // Получаем идентификатор таба из атрибута data-tab-id
        let tabId = $(this).data('tab-id');

        // Закрываем все табы
        $('.tabs__content').removeClass('tabs__content--active');

        // Открываем выбранный таб
        $('#' + tabId).addClass('tabs__content--active');
      });

      // Отображение тултипов
      $('.candidate__tooltip').on('click', function () {
        $(this).toggleClass('candidate__tooltip--active');
      });

      $('.region').each(function () {
        let
          r = $(this).clone().removeClass('region').attr('class');

        regions.push(r);
      });

      regions.sort();

      // console.log(regions)
      // console.log(regs)


      // Инфо региона, кнопка "Следующий"
      $(reg_info_btn_next).on('click', function () {
        let
          current_active_region = $(map).find('.active').clone().removeClass('active region').attr('class');
        let current_active_region_index = regs.indexOf(current_active_region);
        let next_active_region = regs[current_active_region_index + 1] !== undefined ? regs[current_active_region_index + 1] : regs[0];

        $(info_carousel).owlCarousel();
        $(info_carousel).trigger('next.owl.carousel');

        activate(next_active_region);
      });

      // Инфо региона, кнопка "Предыдущий"
      $(reg_info_btn_prev).on('click', function () {
        let
          current_active_region = $(map).find('.active').clone().removeClass('active region').attr('class');
        let current_active_region_index = regs.indexOf(current_active_region);
        let next_active_region = regs[current_active_region_index - 1] !== undefined ? regs[current_active_region_index - 1] : regs[regs.length - 1];

        $(info_carousel).owlCarousel();
        $(info_carousel).trigger('prev.owl.carousel');

        activate(next_active_region);
      });

      // Инфо региона, карусель
      $(info_carousel).owlCarousel(
          {
            loop: true,
            margin: 12,
            dots: false,
            nav: false,
            onDragged(event) {
              let
                div = $(event.target).find('.owl-item.active').find('.region-info__element').first().clone();
              let region = $(div).removeClass('region-info__element').attr('class');

              activate(region);
            },
            responsive:
        {
          0:
            {
              items: 1,
            },
        },
          });

      let
        region = $('.region.' + r).clone().removeClass('region active').attr('class');
      let current_index = regs.indexOf(region);

      $(info_carousel).owlCarousel();
      $(info_carousel).trigger('to.owl.carousel', current_index);

      activate(r);

      // Статьи, кнопка "Следующий"
      $(articles_slider_btn_next).on('click', function () {
        $(articles_carousel).owlCarousel();
        $(articles_carousel).trigger('next.owl.carousel');
      });

      // Статьи, кнопка "Предыдущий"
      $(articles_slider_btn_prev).on('click', function () {
        $(articles_carousel).owlCarousel();
        $(articles_carousel).trigger('prev.owl.carousel');
      });

      // articles_slider_ini($(this).width());

      // Летим к регионгу
      $('a.map__anchor').on('click', function (e) {
        e.preventDefault();

        let
          region = $('.map__info').find('.owl-item.active').first().find('.region-info__element').first().clone().removeClass('region-info__element').attr('class');

        $('html, body').stop().animate(
            {
              scrollTop: $('#' + region).offset().top - 60,
            },
            800);
      });

      // Летим к началу
      $('button.page__up').on('click', function (e) {
        e.preventDefault();

        $('html, body').stop().animate(
            {
              scrollTop: 0,
            },
            800);
      });
    })

// Хинт виден на ховер региона
    .on('mouseover', '.region', function () {
      let
        region = $(this).clone().removeClass('region active').attr('class');

      $('.tag.active').removeClass('active');
      $('.tag.' + region).addClass('active');

      return false;
    })
// Хинт не виден на ховер региона
    .on('mouseout', '.region', function () {
      $('.tag.active').removeClass('active');

      return false;
    })
// Прокрут до инфо карточки региона при клике на карту
    .on('touchstart click', '.region', function () {
      let
        region = $(this).clone().removeClass('region active').attr('class');
      let current_index = regs.indexOf(region);

      $(info_carousel).owlCarousel();
      $(info_carousel).trigger('to.owl.carousel', current_index);

      activate(region);

      return false;
    });

// Инициализация слоайдера со статьями
/* function articles_slider_ini(width)
{
    let
    quantity;

    $(articles_carousel).owlCarousel();
    $(articles_carousel).trigger("destroy.owl.carousel");

    if(width <= 660)
    quantity = 1;
    else if(width > 660 && width <= 900)
    quantity = 2;
    else if(width > 900 && width <= 1350)
    quantity = 3;
    else
    quantity = 4;

    $(articles_carousel).owlCarousel(
    {
        loop: true,
        margin: 10,
        dots: false,
        nav: false,
        responsive:
        {
            0:
            {
                items: quantity
            }
        }
    });
}
*/
// Актвиация региона на карте
function activate(region) {
  $(map).find('.active').removeClass('active');
  $(map).find('.' + region).addClass('active');
  // history.pushState('', '', domain + '/?r=' + region);
}
