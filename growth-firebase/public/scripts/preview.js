$(document).ready(() => {
  if (!isSuggestionRejected()) {
    setHasPreviewed();
  }
  $('#done').on('click', () => {
    clearPreviewStates();
  });
});
