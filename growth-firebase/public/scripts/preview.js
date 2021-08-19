$(document).ready(() => {
  setHasPreviewed();
  $('#done').on('click', () => {
    clearPreviewStates();
  });
});
