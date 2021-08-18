function getLanguage() {
  // TODO: Better way to check locale
  return location.pathname.indexOf('_es') !== -1 ? 'es' : 'en';
}

let messages = {};
const jsonPath = `../i18n/${getLanguage()}.json`;

function fetchMessages() {
  const promise = $.Deferred();
  if (Object.keys(messages).length > 0) {
    promise.resolve(messages);
  } else {
    $.getJSON(jsonPath).then(json => {
      messages = json;
      promise.resolve(messages);
    });
  }
  return promise;
}

fetchMessages();

// Use this messages may not have been fetched
function fetchMessage(key) {
  const promise = $.Deferred();
  fetchMessages().then(messages => {
    promise.resolve(messages[key]);
  });
  return promise;
}

// Use this when certain that messages have been fetched
function getMessage(key) {
  return messages[key];
}
