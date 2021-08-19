function getPositionConfigs() {
  return {
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
}

function getOnboardingScreens() {
  return {
    image: {
      header: getMessage('guidance_image_header'),
      body: getMessage('guidance_image_body'),
      position: 'imageSuggestion',
      pointer: 'bottom',
    },
    article: {
      header: getMessage('guidance_article_header'),
      body: getMessage('guidance_article_body'),
      position: 'articleTitle',
      pointer: 'top-left',
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
