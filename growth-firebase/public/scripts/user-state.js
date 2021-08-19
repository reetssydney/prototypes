const ACCEPTANCE_STATE = 'acceptance';
const ACCEPTANCE_STATE_REJECTED = 'rejected';
const ACCEPTANCE_STATE_ACCEPTED = 'accepted';
const HAS_SEEN_IMAGE_GUIDANCE = 'hasSeenImageGuidance';
const HAS_SEEN_CAPTION_GUIDANCE = 'hasSeenCaptionGuidance';
const HAS_PREVIEWED = 'hasPreviewed';

function getAcceptance() {
  return localStorage.getItem(ACCEPTANCE_STATE);
}

function isSuggestionRejected() {
  return localStorage.getItem(ACCEPTANCE_STATE) === ACCEPTANCE_STATE_REJECTED;
}

function setSuggestionAccepted() {
  localStorage.setItem(ACCEPTANCE_STATE, ACCEPTANCE_STATE_ACCEPTED);
}

function setSuggestionRejected() {
  localStorage.setItem(ACCEPTANCE_STATE, ACCEPTANCE_STATE_REJECTED);
}

function setHasSeenImageGuidance() {
  localStorage.setItem(HAS_SEEN_IMAGE_GUIDANCE, true);
}

function setHasSeenCaptionGuidance() {
  localStorage.setItem(HAS_SEEN_CAPTION_GUIDANCE, true);
}

function hasSeenImageGuidance() {
  return localStorage.getItem(HAS_SEEN_IMAGE_GUIDANCE);
}

function hasSeenCaptionGuidance() {
  return localStorage.getItem(HAS_SEEN_CAPTION_GUIDANCE);
}

function clearGuidancePrefs() {
  localStorage.removeItem(HAS_SEEN_IMAGE_GUIDANCE);
  localStorage.removeItem(HAS_SEEN_CAPTION_GUIDANCE);
}

function setHasPreviewed() {
  localStorage.setItem(HAS_PREVIEWED, true);
};

function clearPreviewStates() {
  localStorage.removeItem(HAS_PREVIEWED);
  localStorage.removeItem(ACCEPTANCE_STATE);
}

function isBackFromPreview() {
  return localStorage.getItem(HAS_PREVIEWED);
}
