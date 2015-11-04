import messages from './messages';
import { Record } from 'immutable';

const InitialState = Record({
  availableLanguages: Object.keys(messages),
  messages,
  selectedLanguage: Object.keys(messages)[0]
});

const initialState = new InitialState;

const revive = state => initialState
  .set('selectedLanguage', state.selectedLanguage);

export default function intlReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  return state;
}