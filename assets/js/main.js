$(function () {

// 検索開く
$('#header-search-js').on('click', function () {
  $('.header-search, .black-bg').addClass('active');
});

// ハンバーガー開く
$('#header-hum-js').on('click', function () {
  $('.header-sp, .black-bg').addClass('active');
});

// 背景クリックで閉じる
$('.black-bg').on('click', function () {
  $('.header-search, .header-sp, .black-bg').removeClass('active');
});

// SPメニュー閉じる
$('.header-sp__btn-img').on('click', function () {
  $('.header-sp, .black-bg').removeClass('active');
});

// ★検索閉じる（修正：クラス名を search-form__close に変更）
$('.search-form__close').on('click', function () {
  $('.header-search, .black-bg').removeClass('active');
});



// 注目のイベントスライダー
$('.js-event-slider').slick({
  arrows: false, // 矢印は HTMLで作る
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
});

// カスタム矢印
$('.event-slider__arrow--prev').on('click', function () {
  $('.js-event-slider').slick('slickPrev');
});

$('.event-slider__arrow--next').on('click', function () {
  $('.js-event-slider').slick('slickNext');
});

// サムネイルの調整
$('.event-slider__item-img img, .event-content__item-img img').each(function () {
  const w = this.naturalWidth;
  const h = this.naturalHeight;

  if (h > w) {
    // 縦長
    $(this).parent().addClass('is-vertical');
  } else {
    // 横長
    $(this).parent().addClass('is-horizontal');
  }
});


// ニュース一覧：カテゴリタブ切り替え
var $newsTabs = $('.news-archive__tab');
var $newsItems = $('.news-archive__item');

function filterNews(type) {
  $newsItems.each(function () {
    var $item = $(this);
    var cat = $item.data('cat');

    if (type === 'all' || cat === type) {
      $item.show();
    } else {
      $item.hide();
    }
  });
}

$newsTabs.on('click', function () {
  var filter = $(this).data('filter');

  // active切り替え
  $newsTabs.removeClass('is-active');
  $(this).addClass('is-active');

  // 表示切り替え
  filterNews(filter);
});

// 初期表示
filterNews('all');


/* =================================
フェイスブック
 ================================= */
(function(){
  const wrap = document.querySelector('.js-fb-wrap');
  const page = document.querySelector('.js-fb-page');
  if(!wrap || !page) return;

  let last = 0;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function render(){
    const w = clamp(Math.round(wrap.clientWidth), 180, 500);
    if (w === last) return;
    last = w;

    // 幅を更新
    page.setAttribute('data-width', w);

    // いったん中身をクリアしてから再パース
    page.innerHTML = '';

    if (window.FB && FB.XFBML) {
      FB.XFBML.parse(wrap);
    }
  }

  // 初回（SDK読込後を想定）
  window.addEventListener('load', render);

  // リサイズ対応（間引き）
  let timer = null;
  window.addEventListener('resize', function(){
    clearTimeout(timer);
    timer = setTimeout(render, 200);
  });
})();








  // TOPへボタン
  $(function () {
    var $topButton = $(".top-to-js");
    var $footer = $("footer"); // フッター要素を取得

    // トップへスクロール
    $topButton.click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    });

    // スクロール時の処理
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var footerTop = $footer.offset().top;

      // フッターに達したかどうか
      if (scrollTop + windowHeight >= footerTop) {
        $topButton.fadeOut();
      } else {
        $topButton.fadeIn();
      }
    });
  });


  // メインビジュアル　スライダー
  $(document).ready(function () {
    const $slides = $('.main-visual-js img');
    let current = 0;
    const slideCount = $slides.length;
    const intervalTime = 4000; // 3秒ごとに切り替え

    // 初期設定：最初の画像以外を非表示
    $slides.hide().eq(current).show();

    // スライド切り替え
    setInterval(function () {
      const next = (current + 1) % slideCount;
      $slides.eq(current).fadeOut(1000);
      $slides.eq(next).fadeIn(1000);
      current = next;
    }, intervalTime);
  });


  //フェードイン
  $(window).scroll(function () {
    const windowHeight = $(window).height(); //ウィンドウの高さ
    const scroll = $(window).scrollTop(); //スクロール量

    $(".fade-in-js").each(function () {
      const targetPosition = $(this).offset().top; //要素の上からの距離
      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass("action");
      }
    });
  });


  $(function () {
    var headerHeight = 40; // ヘッダーの高さ
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHeight;
      $("html, body").animate({
        scrollTop: position
      }, speed, "swing");
      return false;
    });
  });

})