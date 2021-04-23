(function () {
  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }

  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [右邊GoTop]--// window scroll
  $(window)
    .on('scroll', function () {
      goTopShow();
    })
    .scroll();
})();
