(function ($) {
  let images = [],
    idx = 0,
    autoplay = true,
    hovered = false,
    timer = null,
    lb = 0;

  const S = {
    $slides: $(".slides"),
    $dots: $(".dots"),
    $caption: $("#slideCaption"),
    $toggle: $("#toggleAutoplay"),
    $grid: $("#galleryGrid"),
    $slider: $("#slider"),
    $lightbox: $("#lightbox"),
    $lbImg: $("#lightboxImg"),
    $lbCap: $("#lightboxCaption"),
  };

  const tplSlide = (img, i) =>
    `<div class="slide" data-index="${i}"><img src="${img.url}" alt="${img.alt}" onerror="this.onerror=null;this.src='https://picsum.photos/1200/800';"/></div>`;
  const tplDot = (i) =>
    `<button class="dot" role="tab" aria-selected="${
      i === 0
    }" aria-label="Go to slide ${i + 1}"></button>`;
  const tplTile = (img, i) =>
    `<figure class="tile" data-index="${i}"><img src="${img.thumb}" alt="${img.alt}" onerror="this.onerror=null;this.src='https://picsum.photos/400/250';" /><figcaption class="tile-caption">${img.caption}</figcaption></figure>`;

  const setActive = (i) => {
    idx = (i + images.length) % images.length;
    S.$slideItems.attr("aria-hidden", true).removeClass("active");
    S.$slideItems.eq(idx).addClass("active").attr("aria-hidden", false);
    S.$dotItems
      .attr("aria-selected", false)
      .eq(idx)
      .attr("aria-selected", true);
    S.$caption.text(images[idx].caption);
  };

  const updateTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (autoplay && !hovered)
      timer = setInterval(() => setActive(idx + 1), 3000);
    S.$toggle.text(autoplay ? "Pause" : "Play").attr("aria-pressed", autoplay);
  };
  const autoplaySet = (on) => {
    autoplay = !!on;
    updateTimer();
  };

  const render = () => {
    S.$slides.html(images.map(tplSlide).join(""));
    S.$dots.html(images.map((_, i) => tplDot(i)).join(""));
    S.$grid.html(images.map(tplTile).join(""));
    S.$slideItems = S.$slides.children(".slide");
    S.$dotItems = S.$dots.children(".dot");
    setActive(0);
  };

  const updateLb = () => {
    const img = images[lb];
    S.$lbImg.attr({ src: img.url, alt: img.alt });
    S.$lbCap.text(img.caption);
  };
  const openLb = (i) => {
    lb = i;
    updateLb();
    S.$lightbox.addClass("open").attr("aria-hidden", false);
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    S.$lightbox.removeClass("open").attr("aria-hidden", true);
    document.body.style.overflow = "";
  };
  const moveLb = (step) => {
    lb = (lb + step + images.length) % images.length;
    updateLb();
  };

  const bind = () => {
    S.$slider.on("mouseenter mouseleave", (e) => {
      hovered = e.type === "mouseenter";
      updateTimer();
    });

    $(document).on("click", (e) => {
      const $t = $(e.target).closest(
        ".nav,.dot,.tile,[data-close],.lightbox-nav,#toggleAutoplay"
      );
      if (!$t.length) return;
      if ($t.is("#toggleAutoplay")) return autoplaySet(!autoplay);
      if ($t.is(".nav")) return setActive(idx + ($t.hasClass("next") ? 1 : -1));
      if ($t.is(".dot")) return setActive($t.index());
      if ($t.is(".tile")) return openLb(+$t.data("index"));
      if ($t.is("[data-close]")) return closeLb();
      if ($t.is(".lightbox-nav")) return moveLb($t.hasClass("next") ? 1 : -1);
    });

    $(document).on("keydown", (e) => {
      const isOpen = S.$lightbox.hasClass("open");
      const handlers = isOpen
        ? {
            Escape: closeLb,
            ArrowRight: () => moveLb(1),
            ArrowLeft: () => moveLb(-1),
          }
        : {
            ArrowRight: () => setActive(idx + 1),
            ArrowLeft: () => setActive(idx - 1),
            " ": () => {
              e.preventDefault();
              autoplaySet(!autoplay);
            },
          };
      const fn = handlers[e.key];
      if (fn) fn();
    });
  };

  const pic = (p, w, h) => `https://picsum.photos/${p}/${w}/${h}`;
  async function loadPicsum(count = 8) {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=1&limit=${count}`
      );
      if (!res.ok) throw 0;
      const data = await res.json();
      images = data.map(({ id, author = "Picsum" }) => ({
        url: pic(`id/${id}`, 1600, 900),
        alt: `Photo by ${author} (id: ${id})`,
        caption: `${author} — #${id}`,
        thumb: pic(`id/${id}`, 400, 250),
      }));
    } catch {
      images = Array.from({ length: count }, (_, i) => {
        const seed = `seed/fallback-${i + 1}`;
        return {
          url: pic(seed, 1600, 900),
          alt: `Random image ${i + 1} from Picsum`,
          caption: `Picsum random — ${i + 1}`,
          thumb: pic(seed, 400, 250),
        };
      });
    }
  }

  $(async function () {
    S.$slides.html(
      '<div class="slide active" aria-hidden="false" style="display:block;padding:40px;text-align:center;color:#666;">Loading images…</div>'
    );
    await loadPicsum(8);
    render();
    bind();
    updateTimer();
  });
})(jQuery);
