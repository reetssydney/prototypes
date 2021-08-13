const ACCEPTANCE_STATE = 'acceptance';
const ACCEPTANCE_STATE_REJECTED = 'rejected';
const ACCEPTANCE_STATE_ACCEPTED = 'accepted';

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

function clearStates() {
  localStorage.removeItem(ACCEPTANCE_STATE);
}
