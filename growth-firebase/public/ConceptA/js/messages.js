let messagesEn = {
  'postedit-toast-accept': 'You’ve published an edit. Thanks and keep going!',
  'postedit-toast-reject': 'Thanks for reviewing suggestions. Keep going!',
  'header-add-caption': 'Add a Caption',
};

let messagesEs = {
  'postedit-toast-accept': 'Has publicado una edición. ¡Gracias y a por las siguientes!',
  'postedit-toast-reject': 'Gracias por revisar las sugerencias. ¡Sigue adelante!',
  'header-add-caption': 'Add a Caption (in Spanish)',
};

function getLanguage() {
  // TODO: Dynamically check for language
  return 'en';
}

const messages = getLanguage() === 'en' ? messagesEn : messagesEs;

function getMessage(key) {
  return messages[key];
}
