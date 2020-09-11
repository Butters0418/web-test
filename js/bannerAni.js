$(function () {
  // ------------- 偵測圖片載入
  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete)
      incrementCounter();
    else
      img.addEventListener('load', incrementCounter, false);
  });
  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('All img load')
    }
  }
  var loadingtime = 2600;
  function countDown() {
    console.log(loadingtime)
    loadingtime -= 500
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      $('.mask').fadeOut(300);
      if ($(window).width() > 767) {
        bannerAni();
      } else {
        bannerAniMb();
      }
    }
  }
  var timer = setInterval(countDown, 300);

  // banner  動畫
  function bannerAni() {
    var $title = $('.banner__title');
    var $subTitle = $('.banner__subtitle')
    var $cub1 = $('.scene1 .cube');
    var $cub2 = $('.scene2 .cube');
    var $scene = $('.scene');
    var $bannerItem = $('.banner__item');
    var $bannerSliderLink = $('.banner__slider--link');
    var tl = gsap.timeline({ delay: 0.5 });

    // for ie
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      tl.set($title, { opacity: 0 })
      tl.to($title, { duration: 1, x: 0, opacity: 1 })
        .to($subTitle, { duration: 0.5, y: 0, ease: "back.out(1.7)" }, 0.6)
        .to($bannerItem, { stagger: 0.2, duration: 1.5, y: 0, ease: "back.out(1.7)" }, 1.7)
        .to($bannerItem, {
          stagger: 0.2, duration: 1, rotation: 0, ease: "back.out(1.7)", onComplete: function () {
            scollItem()
          }
        }, 2)
        .to($bannerSliderLink, { stagger: 0.2, duration: 1.2, scale: 1, ease: "elastic.out(1, 0.3)" }, 2.6)
        .to($bannerSliderLink, { stagger: 0.2, duration: 0.5, opacity: 1, ease: "none", }, 2.6)
        .to($bannerSliderLink, { stagger: 0.2, duration: 1, y: 0, ease: "bounce.out", }, 2.8)
    } else {
      tl.set($title, { opacity: 0 })
      tl.to($title, { duration: 1, x: 0, opacity: 1 })
        .to($subTitle, { duration: 0.5, y: 0, ease: "back.out(1.7)" }, 0.6)
        .to($cub1, { duration: 3.3, rotationY: 385, rotationX: 365, rotationZ: -5, ease: "power2.out" }, 0.5)
        .to($cub2, { duration: 3.3, rotationY: -335, rotationX: -355, rotationZ: 3, ease: "power2.out" }, 0.7)
        .to($scene, { stagger: 0.3, duration: 3, y: 630, ease: "bounce.out" }, 0.6)
        .to($bannerItem, { stagger: 0.2, duration: 1.5, y: 0, ease: "back.out(1.7)" }, 1.7)
        .to($bannerItem, {
          stagger: 0.2, duration: 1, rotation: 0, ease: "back.out(1.7)", onComplete: function () {
            scollItem()
          }
        }, 2)
        .to($bannerSliderLink, { stagger: 0.2, duration: 1.2, scale: 1, ease: "elastic.out(1, 0.3)" }, 2.6)
        .to($bannerSliderLink, { stagger: 0.2, duration: 0.5, opacity: 1, ease: "none", }, 2.6)
        .to($bannerSliderLink, { stagger: 0.2, duration: 1, y: 0, ease: "bounce.out", }, 2.8)
    }
  }
  function bannerAniMb() {
    var $title = $('.banner__title');
    var tl = gsap.timeline({ delay: 0.5 });
    tl.set($title, { opacity: 0 })
    tl.to($title, { duration: 1, x: 0, opacity: 1 })
  }
  // 滾動 item
  function scollItem() {
    $(window).on('scroll', function () {
      var $windowTop = $(window).scrollTop();
      if ($windowTop > 100) {
        gsap.to($('.banner__item'), { stagger: 0.1, duration: 1.5, y: 450, ease: "back.out(1.7)" })
      }
      else {
        gsap.to($('.banner__item'), { stagger: 0.1, duration: 1.5, y: 0, ease: "back.out(1.7)" })
      }
    })
  }
  // END banner動畫

  // 飄花瓣動畫
  var obj = ['url("img/flower01.png")', 'url("img/flower02.png")', 'url("img/flower03.png")', 'url("img/flower04.png")', 'url("img/flower05.png")', 'url("img/flower06.png")', 'url("img/flower07.png")'];
  var $bannerAnimation = $('.banner__flower');
  var w = $bannerAnimation.innerWidth();
  var h = $bannerAnimation.innerHeight();
  var total = 16;
  if ($(window).width() < 1250) {
    total = 12;
  };

  //if not safari
  if (!window.navigator.userAgent.match(/^((?!chrome|android).)*safari/i)) {
    flowerAni()
  }
  // 花瓣動畫
  function flowerAni() {
    // 樹搖擺
    gsap.to($('.banner__tree--right'), { duration: 3, rotate: -5, repeat: -1, yoyo: true, ease: "sine.inOut", })
    gsap.to($('.tree-left1'), { duration: 3.5, rotate: 4, repeat: -1, yoyo: true, ease: "sine.inOut", })
    gsap.to($('.tree-left2'), { duration: 2.5, rotate: 8, repeat: -1, yoyo: true, ease: "sine.inOut", })
    function addDiv() {
      var $div = $('<div>');
      var imgurl = obj[Robj(8)];
      var wStart = w * 0.6;
      var wEnd = w + 600;
      gsap.set($div, {
        attr: { class: 'dot' }, backgroundImage: imgurl, x: R(wStart, wEnd), y: R(-100, -1000), z: R(-200, 400)
      });
      $bannerAnimation.append($div);
      anim($div);
    }
    function anim(elm) {
      gsap.to(elm, {
        duration: R(8, 15),
        y: h, ease: "none", delay: R(-2, -6), onComplete: function () {
          elm.remove();
          addDiv();
        }
      });
      gsap.to(elm, { duration: 1, opacity: 0, delay: R(10, 14) });
      gsap.to(elm, { duration: R(8, 14), x: '-=1250', rotationZ: R(0, 180), ease: "sine.out" });
      gsap.to(elm, { duration: R(2, 8), rotationX: R(0, 360), rotationY: R(0, 360), repeat: -1, yoyo: true, ease: "sine.inOut", delay: -5 });
    };
    for (i = 0; i < total; i++) {
      addDiv();
    }
  }
  // END 飄花
  function R(min, max) {
    return min + Math.random() * (max - min)
  };
  function Robj(max) {
    return Math.floor(Math.random() * max);
  };
})