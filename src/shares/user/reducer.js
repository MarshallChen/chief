import User from './user';
import { Record } from 'immutable';

const InitialState = Record({
  user: null
});
const initialState = new InitialState;

function revive({user}) {
  return initialState.merge({
    user: user ? new User(user) : null
  })
}

export default function userReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return revive(state);

  return state;

}