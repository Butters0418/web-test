$(function () {

  // [側邊選單] 
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  })

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      $('.main').addClass('addPadding')
    }
    else {
      $sidenav.removeClass('fixed');
      $('.main').removeClass('addPadding')
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop - 100 : targetTop - headerH - sidenavH;
    $('html, body').stop().animate({
      scrollTop: scrollPos
    }, 300);
  });


  //bank tabs slider
  var bankSwiper = new Swiper('#section1 .swiper-container', {
    slidesPerView: 6,
    spaceBetween: 20,
    simulateTouch: false,
    breakpoints: {
      1199: {
        simulateTouch: 'true',
        slidesPerView: 'auto',
      },
      575: {
        spaceBetween: 5,
        slidesPerView: 'auto',
      }
    }
  });

  //bank tabs slider
  var paySwiper = new Swiper('#section2 .swiper-container', {
    slidesPerView: 6,
    spaceBetween: 20,
    simulateTouch: false,
    breakpoints: {
      1199: {
        simulateTouch: 'true',
        slidesPerView: 'auto',
      },
      575: {
        spaceBetween: 5,
        slidesPerView: 'auto',
      }
    }
  });

  // 銀行儲值hover
  var nowValue = 'bank1';
  $('.bank-tab').on('mouseover', '.swiper-slide', function () {
    var thisValue = $(this).data('value');
    $(this).addClass('now').siblings().removeClass('now')
    if (thisValue === nowValue) {
      return
    } else {
      nowValue = thisValue;
      slidePanes();
    }
  })
  function slidePanes() {
    var currentPane = $('.pane').filter(function () {
      return $(this).data('class') === nowValue;
    })
    var bankPaneContainer = $('.bank-pane .container-fluid');
    currentPane.length > 1 ? bankPaneContainer.addClass('middleLine') : bankPaneContainer.removeClass('middleLine')
    $('.pane').addClass('d-none').removeClass('fadeInLeft');
    currentPane.each(function (index, item) {
      $(this).removeClass('d-none').addClass('fadeInLeft')
      index === 1 && $(this).addClass('pane-mt')
    })
  }
  //bank hover init
  $('.bank-tab .swiper-slide').eq(0).addClass('now');
  slidePanes()


  //banner ani
  $('.balloon').each(function (index) {
    gsap.to($(this), { duration: 4, y: '-=15', repeat: -1, yoyo: true, ease: "power1.inOut", delay: -index * 0.5 })
  })

  // box animation for >768
  var $box = $('.box');
  function boxAni() {
    var tl = gsap.timeline();
    tl.to($box, { duration: 5, y: 10, ease: "back.out(1.7)" })
      .to($box, { duration: 2.5, y: 40, repeat: -1, yoyo: true, ease: 'none' })
      .to($box, { duration: 2, rotation: 20, repeat: -1, yoyo: true, ease: 'none' }, 0)
  }
  $(window).width() > 768 && boxAni();

  $(window).on('scroll', function () {
    goTopShow();
    $(window).width() < 768 && rightnavFixedTop();
  }).scroll();

  // 隨機整數 包含 min & mix
  function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
