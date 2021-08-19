function getPositionConfigs() {
  return {
    imageSuggestion: {
      targetSelector: '.conceptA-inspectImgContainer',
      position: 'below',
      scrollTop: 0,
      offsetIn: 10,
    },
    articleTitle: {
      targetSelector: '#openFullscreenImg',
      position: 'above',
      scrollTop: 0,
      offsetIn: 40,
    },
    suggestionReason: {
      targetSelector: '#suggestion_reason',
      position: 'above',
      offsetOut: 10,
    },
    caption: {
      targetSelector: '.caption-page__input-field',
      position: 'below',
      scrollTop: 0,
    },
  };
}

function getOnboardingScreens() {
  return {
    image: {
      header: getMessage('guidance_image_header'),
      body: getMessage('guidance_image_body'),
      position: 'imageSuggestion',
      pointer: 'top-center',
    },
    article: {
      header: getMessage('guidance_article_header'),
      body: getMessage('guidance_article_body'),
      position: 'articleTitle',
      pointer: 'bottom',
    },
    details: {
      header: getMessage('guidance_details_header'),
      body: getMessage('guidance_details_body'),
      position: 'suggestionReason',
      pointer: 'bottom'
    },
    caption: {
      header: getMessage('guidance_caption_header'),
      body: getMessage('guidance_caption_body'),
      list: [
        getMessage('guidance_caption_guide_relates'),
        getMessage('guidance_caption_guide_value'),
        getMessage('guidance_caption_guide_review'),
        getMessage('guidance_caption_guide_language'),
      ],
      position: 'caption',
      pointer: 'top-left',
    }
  };
}
