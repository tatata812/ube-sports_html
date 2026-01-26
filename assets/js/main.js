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

/* =================================
サムネイル縦横判定
 ================================= */
function applyOrientation($img) {
  const el = $img[0];

  // 未読込は何もしない（ここで誤判定しない）
  if (!el.naturalWidth || !el.naturalHeight) return;

  const $wrap = $img.parent(); // ここが付与先（必要なら .closest() に変える）

  const isVertical = el.naturalHeight > el.naturalWidth;

  $wrap
    .toggleClass('is-vertical', isVertical)
    .toggleClass('is-horizontal', !isVertical);

  // デバッグ（必要なら消してOK）
  // console.log(el.currentSrc || el.src, el.naturalWidth, el.naturalHeight, isVertical ? 'V' : 'H');
}

function bindOrientation(selector) {
  $(selector).each(function () {
    const $img = $(this);

    // すでに読めてるなら即判定
    if (this.complete && this.naturalWidth) {
      applyOrientation($img);
      return;
    }

    // 読み込み後に判定（1回だけ）
    $img.one('load', function () {
      applyOrientation($img);
    });

    // エラー時（任意）
    $img.one('error', function () {
      // console.warn('image load error:', this.currentSrc || this.src);
    });
  });
}

bindOrientation('.event-slider__item-img img, .event-content__item-img img');



/* =================================
// ニュース一覧：カテゴリタブ切り替え
 ================================= */
var $newsTabs = $('.news-archive-js');
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


/* =================================
ヘッダーアコーディオン
 ================================= */
  const $wrap  = $('.header__menu-wrap');
  const $inner = $wrap.find('.header__menu-inner');
  const speed  = 180;

  function closeAll() {
    // 開いてるsubmenuを閉じる
    $inner.find('.header__submenu.is-open')
      .stop(true, true)
      .slideUp(speed)
      .removeClass('is-open');

    // 親メニューの見た目クラスも外す（任意）
    $inner.find('.header__menu.is-open').removeClass('is-open');
  }

  function openSub($menu) {
    const $sub = $menu.next('.header__submenu');
    if (!$sub.length) {
      // submenuが無いメニューを触ったら、開いてるのは閉じる（好み）
      closeAll();
      return;
    }

    // すでにこのsubmenuが開いてるなら何もしない（チラつき防止）
    if ($sub.hasClass('is-open')) return;

    closeAll();

    // hoverしたaの真下に出す（inner基準でleftを算出）
    const left = $menu.offset().left - $inner.offset().left;
    $sub.css({ left });

    $menu.addClass('is-open');

    $sub
      .stop(true, true)
      .addClass('is-open')
      .slideDown(speed);
  }

  // PC hover：aに乗ったら開く
  $inner.on('mouseenter', '.header__menu', function () {
    openSub($(this));
  });

  // submenu側にマウスが入っても開いたままにするため、
  // menu-wrapから出たら閉じる
  $wrap.on('mouseleave', function () {
    closeAll();
  });

  // キーボード操作：フォーカスでも開く
  $inner.on('focusin', '.header__menu', function () {
    openSub($(this));
  });

  // wrap外にフォーカスが出たら閉じる
  $wrap.on('focusout', function (e) {
    if (!$.contains(this, e.relatedTarget)) {
      closeAll();
    }
  });





/* =================================
メインビジュアル　スライダー
 ================================= */
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

  /* =================================
  ページ内リンク　ヘッダーの高さ考慮
 ================================= */
   var $header = $('.header');

  function getHeaderH() {
    if (!$header.length) return 0;
    return $header.outerHeight() || 0;
  }

  function scrollToHash(hash, speed) {
    if (!hash || hash === '#') return;

    var $target = $(hash);
    if (!$target.length) return;

    var targetTop = $target.offset().top - getHeaderH();

    $('html, body').stop().animate(
      { scrollTop: targetTop },
      typeof speed === 'number' ? speed : 400
    );
  }

  $(document).on('click', 'a[href^="#"]', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    if (!$(href).length) return;

    e.preventDefault();

    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }

    scrollToHash(href, 400);
  });

  $(window).on('load', function () {
    if (location.hash) {
      scrollToHash(location.hash, 0);
    }
  });


  /* =================================
  アニメーション　フェードイン
 ================================= */
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


})