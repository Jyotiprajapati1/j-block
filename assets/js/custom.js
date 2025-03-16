// Function to check if a class exists in the DOM
function doesClassExist(className) {
  var allElements = document.getElementsByTagName("*");
  for (var i = 0; i < allElements.length; i++) {
    if (allElements[i].classList.contains(className)) {
      return true;
    }
  }
  return false;
}

var classNameToCheck = "main-slider";
if (doesClassExist(classNameToCheck)) {
  var elms = document.getElementsByClassName("main-slider");

  for (var i = 0; i < elms.length; i++) {
    new Splide(elms[i]).mount();
  }
}

// Usage
jQuery(document).ready(function ($) {
  // Pass $ as an alias for jQuery inside this function

  // Initialize marquee
  $(".post-ticker-marquee").marquee();

  //Post Filter
  $(".experimental-block-post-filter-tab-item").on("click", function () {
    // Get the parent experimental-block-post-filter container
    var parent = $(this).closest(".experimental-block-post-filter");

    // Remove 'active' class from all tabs and content within this container
    parent
      .find(
        ".experimental-block-post-filter-tab-item, " +
        ".experimental-block-post-filter-grid-tab-content, " +
        ".experimental-block-post-filter-list-tab-content"
      )
      .removeClass("active");

    // Add 'active' class to the clicked tab
    $(this).addClass("active");

    // Get the data-tab attribute of the clicked tab
    var activeTab = $(this).attr("data-tab");

    // Add 'active' class to the corresponding tab content
    parent
      .find(
        '.experimental-block-post-filter-grid-tab-content[data-tab="' +
        activeTab +
        '"], ' +
        '.experimental-block-post-filter-list-tab-content[data-tab="' +
        activeTab +
        '"]'
      )
      .addClass("active");
  });

});

/** Advance galary Magnific Popup  */
jQuery(document).ready(function ($) {
  $(".wp-block-experimental-block-advanced-gallery a").magnificPopup({
    type: "image",
    closeBtnInside: true,
    mainClass: "mfp-with-zoom mfp-img-mobile custom-popup",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
      tPrev: "Previous",
      tNext: "Next",
    },
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        return `<div class="caption-wrapper">${item.el
          .find("img")
          .attr("alt")}</div>`;
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
    },
  });
});

/** Social-Share Block */
document.addEventListener("DOMContentLoaded", function () {
  const facebookButtons = document.querySelectorAll(".wp-block-facebook-share");
  facebookButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const twitterButtons = document.querySelectorAll(".wp-block-twitter-share");
  twitterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://twitter.com/intent/tweet?text=YOUR_TEXT&url=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const gmailButtons = document.querySelectorAll(".wp-block-gmail-share");
  gmailButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = ` mailto:?subject=Shared%20through%20%20social%20share%20block&body=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const whatsAppButtons = document.querySelectorAll(".wp-block-whatsApp-share");
  whatsAppButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20website:%20${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const linkedInButtons = document.querySelectorAll(".wp-block-linkedIn-share");
  linkedInButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const redditButtons = document.querySelectorAll(".wp-block-reddit-share");
  redditButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const tumblrButtons = document.querySelectorAll(".wp-block-tumblr-share");
  tumblrButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const diigoButtons = document.querySelectorAll(".wp-block-diigo-share");
  diigoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.diigo.com/post?url=${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const pinterestButtons = document.querySelectorAll(
    ".wp-block-pinterest-share"
  );
  pinterestButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        currentUrl
      )}L&description=Shared%20through%20%20social%20share%20block`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const viberButtons = document.querySelectorAll(".wp-block-viber-share");
  viberButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `viber://forward?text=Shared%20through%20%20social%20share%20block%20${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const snapchatButtons = document.querySelectorAll(
    ".wp-block-snapchat-share"
  );
  snapchatButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://www.snapchat.com/send?text=Shared%20through%20%20social%20share%20block%20${encodeURIComponent(
        currentUrl
      )}`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });

  const telegramButtons = document.querySelectorAll(
    ".wp-block-telegram-share"
  );
  telegramButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      const shareUrl = `https://t.me/share/url?ur&${encodeURIComponent(
        currentUrl
      )}text=Shared%20through%20%20social%20share%20block%20`;
      window.open(shareUrl, "_blank", "width=800,height=500");
    });
  });
});

jQuery(document).ready(function ($) {
  // Pass $ as an alias for jQuery inside this function

  // Initialize marquee
  $(".text-marquee").marquee();

  //Post Filter
  $(".experimental-block-text-marquee-item").on("click", function () {
    // Get the parent experimental-block-post-filter container
    var parent = $(this).closest(".wp-block-experimental-block-text-marquee");

    // Remove 'active' class from all tabs and content within this container
    parent.find(".experimental-block-text-marquee-item").removeClass("active");

    // Add 'active' class to the clicked tab
    $(this).addClass("active");

    // Get the data-tab attribute of the clicked tab
    var activeTab = $(this).attr("data-tab");

    // Add 'active' class to the corresponding tab content
    parent
      .find(
        '.experimental-block-text-marquee-item[data-tab="' + activeTab + '"]'
      )
      .addClass("active");
  });
});

/**Back-to-top Block */
jQuery(document).ready(function () {
  const footer = jQuery("footer");
  const backToTopBlock = jQuery(".back-to-top-icon").parent();

  if (footer.length && backToTopBlock.length) {
    footer.after(backToTopBlock);
  }

  const button = jQuery(".back-to-top-icon");

  if (button.length) {
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > 300) {
        button.addClass("is-visible");
      } else {
        button.removeClass("is-visible");
      }
    });

    button.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      jQuery("html, body").animate(
        {
          scrollTop: 0,
        },
        800
      );
    });
  }
});

/** accordion block */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Accordion for each container
  const accordions = document.querySelectorAll('.accordion-container');
  accordions.forEach(container => {
    new Accordion(container);
  });



});


/**counter && progressbar */
jQuery(document).ready(function ($) {
  const counter = $(".counter-item");
  if (counter.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let $item = $(entry.target);
            let targetNumber = parseInt($item.text(), 10);
            let currentCount = 0;
            let dataSpeed = parseInt($item.data("speed")) * 1000;
            let frameRate = 60;
            let steps = frameRate * (dataSpeed / 1000);
            let increment = targetNumber / steps;
            let currentValue = 0;

            const counter = setInterval(() => {
              currentValue += increment;
              currentCount = Math.round(currentValue);

              if (currentCount <= targetNumber) {
                $item.text(currentCount);
              }

              if (currentValue >= targetNumber) {
                $item.text(targetNumber);
                clearInterval(counter);
              }
            }, 1000 / frameRate);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    counter.each(function () {
      counterObserver.observe(this);
    });
  }
  const barCounter = $(".progressbar-item");
  if (barCounter.length > 0) {
    const progressBarObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let $item = $(entry.target);

            if ($item.attr("bar-type") === "circle") {
              new ProgressBar.Circle($item[0], {
                strokeWidth: $item.attr("bar-stroke-width"),
                easing: "easeInOut",
                duration: 1400,
                color: $item.attr("bar-color"),
                trailColor: $item.attr("bar-path-color"),
                trailWidth: $item.attr("bar-trial-width"),
                svgStyle: {
                  width: $item.attr("bar-width"),
                  height: $item.attr("bar-width"),
                },
              }).animate($item.attr("bar-progress-count") / 100);
            } else {
              new ProgressBar.Line($item[0], {
                strokeWidth: $item.attr("bar-stroke-width"),
                easing: "easeInOut",
                duration: 1400,
                color: $item.attr("bar-color"),
                trailColor: $item.attr("bar-path-color"),
                trailWidth: $item.attr("bar-trial-width"),
              }).animate($item.attr("bar-progress-count") / 100);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    barCounter.each(function () {
      progressBarObserver.observe(this);
    });
  }
});

//map
document.addEventListener('DOMContentLoaded', () => {
  const hereMaps = document.querySelectorAll('.here-map');

  const loadScripts = async (scripts) => {
    const loadedScripts = new Set();

    for (const src of scripts) {
      if (!loadedScripts.has(src)) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            loadedScripts.add(src);
            resolve();
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
    }
  };

  const geocodeCache = new Map();

  const initMap = async (mapElement) => {
    const { location, zoom, apiKey } = mapElement.dataset;

    if (!apiKey) {
      mapElement.innerHTML = 'API Key Required';
      return;
    }

    try {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const service = platform.getSearchService();
      const defaultLayers = platform.createDefaultLayers();

      mapElement.innerHTML = '';
      const map = new window.H.Map(
        mapElement,
        defaultLayers.vector.normal.map,
        { zoom: parseInt(zoom), center: { lat: 52.53086, lng: 13.38469 } }
      );

      new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );

      const getCachedLocation = async (query) => {
        if (geocodeCache.has(query)) return geocodeCache.get(query);

        const result = await new Promise((resolve, reject) => {
          service.geocode(
            { q: query },
            (response) => {
              const position = response.items?.[0]?.position;
              if (position) {
                geocodeCache.set(query, position);
                resolve(position);
              } else {
                reject(new Error('Location not found'));
              }
            },
            reject
          );
        });

        return result;
      };

      try {
        const position = await getCachedLocation(decodeURIComponent(location));
        map.setCenter(position);

        map.addObject(
          new window.H.map.Marker({
            lat: position.lat,
            lng: position.lng
          })
        );
      } catch (geoError) {
        console.error('Geocoding failed:', geoError);
        mapElement.innerHTML = 'Could not find location';
      }
      const resizeMap = () => {
        map.getViewPort().resize();
      };
      window.addEventListener('resize', resizeMap);

      mapElement.__hereMap = map;
    } catch (error) {
      console.error('Map initialization error:', error);
      mapElement.innerHTML = 'Map failed to load';
    }
  };

  const initHereMaps = async () => {
    await loadScripts([
      'https://js.api.here.com/v3/3.1/mapsjs-core.js',
      'https://js.api.here.com/v3/3.1/mapsjs-service.js',
      'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
    ]);

    await Promise.all(
      Array.from(hereMaps).map(initMap)
    );
  };

  initHereMaps().catch(console.error);
});