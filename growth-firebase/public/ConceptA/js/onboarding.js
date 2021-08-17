const onboardingScreens = {
  image: {
    header: 'Look at the image suggested',
    body: 'The image is suggested by a machine and found from Wikimedia Commons, the free license image repository used by Wikipedia for images.',
    position: 'imageSuggestion',
    pointer: 'bottom',
  },
  article: {
    header: 'Is it suitable for this article?',
    body: 'Review the article for which this image is being suggested. Does it seem like the image is suitable and helpful for readers to understand this topic?',
    position: 'articleTitle',
    pointer: 'top-left',
  },
  details: {
    header: 'Use the image details to help with your decision',
    body: 'To help evaluate the image suitability, review the image by looking at its file name, description, the reason it was suggested, and zooming in to see more details.',
    position: 'suggestionReason',
    pointer: 'bottom'
  },
  caption: {
    header: 'Write a caption that gives context to the image',
    body: 'Describe the image so it’s clear how it relates to the article.A few guidelines:',
    list: [
      'Avoid making value judgements like “good”, “ugly”, or “beautiful".',
      'Review the description and filename for information that is relevant to include.',
      'Write in the language of the Wikipedia you are in.',
    ],
    position: 'caption',
    pointer: 'top-left',
  }
};

const positionConfigs = {
  imageSuggestion: {
    targetSelector: '#openFullscreenImg',
    position: 'above',
    scrollTop: 0,
    offsetIn: 20,
  },
  articleTitle: {
    targetSelector: '.articleTitle',
    position: 'below',
    scrollTop: 0,
    offsetOut: 10,
  },
  suggestionReason: {
    targetSelector: '#suggestion_reason',
    position: 'above',
    offsetOut: 10,
  },
  caption: {
    targetSelector: '.overImage',
    position: 'below',
    scrollTop: 'target',
  },
};


let $container, currentIndex = 0, endIndex = 2, captionIndex; // indices past endIndex can be invoked manually outside of the flow of the in-dialog navigation

function getNavButton(isNext, isCheck) {
  const className = isNext ? 'onboarding-item-button-next' : 'onboarding-item-button-prev';
  return $('<button>').addClass([
    'ooui-btn', 'onboarding-item-button', className,
    isNext ? 'primary-progressive' : '',
    isCheck ? 'onboarding-item-button-check' : '',
  ]);
}

function createOnboardingItem(content = {}, index) {
  const { header, body, list, position, pointer } = content;
  const $item = $('<div>').addClass([
    'onboarding-item',
    `onboarding-item-${index}`,
    `onboarding-item-pointer-${pointer}`
  ]);
  $item.data('position', position);
  const $closeButton = $('<a>').addClass(['onboarding-item-button-close']);
  const $header = $('<div>').addClass('onboarding-item-header').text(header);
  const $body = $('<div>').addClass('onboarding-item-body').text(body);
  $item.append([ $closeButton, $header, $body ]);

  if (list && list.length) {
    const $list = $('<ul>').addClass('onboarding-item-body-list');
    list.forEach(listItem => {
      $list.append($('<li>').text(listItem));
    });
    $item.append($list);
  }
  const $nav = $('<div>').addClass('onboarding-item-nav');
  if (index > 0 && index <= endIndex) {
    $nav.append(getNavButton());
  }
  if (index < endIndex) {
    $nav.append(getNavButton(true));
  }
  if (index === endIndex || index > endIndex) {
    $nav.append(getNavButton(true, true));
  }
  $item.append($nav);
  return $item;
}

function initializeOnboarding($onboardingContainer) {
  $container = $onboardingContainer;

  $('.onboarding-overlay').addClass('show');

  const screens = [
    onboardingScreens.image,
    onboardingScreens.article,
    onboardingScreens.details,
    onboardingScreens.caption
  ];
  captionIndex = screens.length - 1;
  screens.forEach((screenData, index) => {
    $container.append(createOnboardingItem(screenData, index));
  });

  $container.on('click', '.onboarding-item-button-prev', () => {
    if (currentIndex === 0) {
      return;
    }
    currentIndex -= 1;
    showOnboardingIndex(currentIndex);
  });

  $container.on('click', '.onboarding-item-button-next', (e) => {
    if (currentIndex === endIndex || currentIndex > endIndex) {
      closeOnboarding();
      $('.onboarding-overlay').removeClass('show');
      return;
    }
    currentIndex += 1;
    showOnboardingIndex(currentIndex);
  });

  $container.on('click', '.onboarding-item-button-close', (e) => {
    e.preventDefault();
    closeOnboarding();
    $('.onboarding-overlay').removeClass('show');
  });

  $container.on('click', '.onboarding-item-button-check', (e) => {
    dismissOnboarding();
  });

  window.showCaptionOnboarding = () => {
    showOnboardingIndex(captionIndex);
    $('.onboarding-overlay').addClass('show');
  };
}

function teardownOnboarding() {
  $container.html('');
}

function closeOnboarding() {
  $('.onboarding-item-positioned').removeClass('onboarding-item-positioned');
}

function dismissOnboarding() {
  if (captionIndex === currentIndex) {
    setHasSeenImageGuidance();
  } else {
    setHasSeenCaptionGuidance();
  }
}

function getTopPostionValue($target, $onboadingItem, positionOptions={}) {
  const { position, offsetIn = 0, offsetOut = 0, manualTop } = positionOptions;
  if (manualTop) {
    return manualTop;
  }
  const targetTopOffset = $target.offset().top;
  const documentScrollTop = $(document).scrollTop();
  // TODO: Adjust position if content will extend past viewport

  // Position guidance below target
  if (position === 'below') {
    return targetTopOffset - documentScrollTop + $target.outerHeight() + offsetOut - offsetIn;

  } else {
    // Position guidance above target
    return targetTopOffset - documentScrollTop - $onboadingItem.outerHeight() - offsetOut + offsetIn ;
  }

}

function scrollToTarget(scrollTop, duration=400) {
  $('html, body').animate({ scrollTop: scrollTop }, duration);
}

function positionOnboardingItem($onboadingItem, positionOptions={}) {
  const { scrollTop, targetSelector } = positionOptions;
  const $target = $(targetSelector);
  let duration = 0;

  if (typeof scrollTop === 'number') {
    duration = 400;
    scrollToTarget(scrollTop, duration);
  } else if (scrollTop === 'target') {
    duration = 400;
    scrollToTarget($target.offset().top - $('.overlay-header').height(), duration);
  }

  setTimeout(() => {
    closeOnboarding();
    const top = getTopPostionValue($target, $onboadingItem, positionOptions);
    $onboadingItem.css('top', top + 'px').addClass('onboarding-item-positioned');
  }, duration + 50);
}

function showOnboardingIndex(index) {
  const $onboadingItem = $container.find(`.onboarding-item-${index}`);
  const positionConfig = positionConfigs[$onboadingItem.data('position')];

  if (positionConfig) {
    currentIndex = index;
    positionOnboardingItem($onboadingItem, positionConfig);
  }
};
